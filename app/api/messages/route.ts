import { NextResponse } from "next/server"
import getCurrentUser from "@actions/getCurrentUser"
import prisma from '@lib/prismadb'
import { pusherServer } from "@lib/pusher"

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const {
            message,
            image,
            conversationId
        } = await req.json()
        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true,
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })
        await pusherServer.trigger(conversationId, 'messages:new', newMessage)
        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]
        updatedConversation.users.map(user => {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            })
        })
        return NextResponse.json(newMessage)
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('InternalError', { status: 500 })
    }
}