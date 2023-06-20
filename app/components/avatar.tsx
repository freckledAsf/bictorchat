'use client'

import useActiveUserList from "@hooks/useActiveUserList"
import { User } from "@prisma/client"
import Image from "next/image"
import clsx from "clsx"

interface Props {
    user: User,
    big?: boolean,
}

export default function Avatar({
    user,
    big,
}: Props) {
    const { members } = useActiveUserList()
    if (!user) return
    const isActive = members.indexOf(user?.email!) !== -1
    return (
        <div className="relative">
            <div className={clsx(`
                relative
                inline-block
                rounded-full
                overflow-hidden
            `,
                big ? 'h-24 w-24' : 'h-11 w-11'
            )}>
                <Image
                    fill
                    src={user.image || `https://avatar.vercel.sh/${user.name}`}
                    alt={`${user.name} avatar`}
                />
            </div>
            {isActive && (
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
            )}
        </div>
    )
}
