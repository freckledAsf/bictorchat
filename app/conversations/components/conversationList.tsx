'use client'

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@hooks/useConversation"
import { useSession } from "next-auth/react"
import { pusherClient } from "@lib/pusher"
import { find } from "lodash"
import { User } from "@prisma/client"
import { FullConversationType } from "@types"
import GroupChatModal from './groupChatModal'
import ConversationItem from "./conversationItem"
import { MdGroupAdd } from 'react-icons/md'

interface Props {
    users: User[],
    initialItems: FullConversationType[]
}

export default function ConversationList({
    users,
    initialItems,
}: Props) {
    const [items, setItems] = useState(initialItems)
    const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false)
    const router = useRouter()
    const session = useSession()
    const { conversationId } = useConversation()
    const pusherKey = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return
        }
        const newHandler = (conversation: FullConversationType) => {
            setItems(current => {
                if (find(current, { id: conversation.id })) {
                    return current
                }
                return [conversation, ...current]
            })
        }

        const updateHandler = (conversation: FullConversationType) => {
            setItems(current => current.map(item => {
                if (item.id === conversation.id) {
                    return {
                        ...item,
                        messages: conversation.messages
                    }
                }
                return item
            }))
        }

        const deleteHandler = (conversation: FullConversationType) => {
            setItems(current => {
                return [...current.filter(item => item.id !== conversation.id)]
            })

            if (conversationId === conversation.id) {
                router.push('/conversations')
            }
        }

        pusherClient.subscribe(pusherKey)
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:delete', deleteHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:delete', deleteHandler)
        }
    }, [pusherKey, conversationId, router])
    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isGroupChatModalOpen}
                onClose={() => setIsGroupChatModalOpen(false)}
            />
            <aside className="
                fixed
                inset-y-0
                pb-20
                lg:pb-0
                lg:left-20
                lg:w-80
                overflow-y-auto
                border-r
                border-gray-200
                invisible
                lg:visible
                dark:border-gray-700
            ">
                <div className="px-5">
                    <div className="
                        flex
                        justify-between
                        mb-4
                        pt-4
                    ">
                        <div className="
                            text-2xl
                            font-bold
                            text-gray-950
                            dark:text-gray-200
                        ">
                            Mensajes
                        </div>
                        <div
                            onClick={() => setIsGroupChatModalOpen(true)}
                            className="
                                rounded-full
                                p-2
                                bg-gray-100
                                text-gray-600
                                cursor-pointer
                                hover:opacity-75
                                transition
                                dark:bg-gray-900
                                dark:text-gray-400
                                dark:hover:bg-gray-950
                                dark:hover:opacity-100
                                dark:hover:text-gray-300
                            "
                        >
                            <MdGroupAdd size={20} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        {items.map(item =>
                            <ConversationItem
                                key={item.id}
                                data={item}
                                selected={conversationId === item.id}
                            />
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}