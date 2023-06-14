import prisma from '@lib/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    try {
        const {
            email,
            name,
            password
        } = await req.json()

        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user)
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}
