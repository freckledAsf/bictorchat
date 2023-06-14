'use client'

import { User } from "@prisma/client"
import UserItem from "./userItem"

interface Props {
    users: User[]
}

export default function UserList({
    users
}: Props) {
    return (
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
            block
            w-full
            left-0
            dark:border-gray-700
        ">
            <div className="px-5">
                <div className="flex-col">
                    <div className="
                        text-2xl
                        font-bold
                        text-gray-950
                        py-4
                        dark:text-gray-200
                    ">
                        Usuarios
                    </div>
                </div>
                {users.map(item =>
                    <UserItem
                        key={item.id}
                        user={item}
                    />    
                )}
            </div>
        </aside>
    )
}