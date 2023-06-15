'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface Props {
    user: User
}

export default function Avatar({
    user,
}: Props) {
    if (!user) return
    return (
        <div className="relative">
            <div className="
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-9
                w-9
                md:h-11
                md:w-11
            ">
                <Image
                    fill
                    src={user.image || `https://avatar.vercel.sh/${user.name}`}
                    alt={`${user.name} avatar`}
                />
            </div>
            {/*
            <span className="
                absolute
                block
                rounded-full
                bg-green-500
                ring-2
                ring-gray-100
                top-0
                right-0
                h-2
                w-2
                md:h-3
                md:w-3
                dark:ring-gray-800
            "/>
            */}
        </div>
    )
}
