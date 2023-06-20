import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@lib/prismadb'

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const {
            name,
            image,
        } = await req.json()

        if (!currentUser?.id) return new NextResponse('Unauthorized', { status: 401 })
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name
            }
        })
        return NextResponse.json(updatedUser)
    } catch (error: any) {
        console.log(error, 'ERROR_SETTINGS')
        return new NextResponse('Internal Error', { status: 500 })
    }
}