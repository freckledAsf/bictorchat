'use client'

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import Avatar from "@components/avatar"

interface Props {
    user: User
}

export default function UserBox({
    user,
}: Props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(() => {
        setIsLoading(true)
        axios.post('/api/conversations', {
            userId: user.id
        }).then((data) => {
            router.push(`/conversations/${data.data.id}`)
        })
        setIsLoading(false)
    }, [axios, router, user])

    return (
        <div
            onClick={handleClick}
            className="
                w-full
                relative
                flex
                items-center
                space-x-3
                bg-white
                p-3
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer
            "
        >
            <Avatar user={user} />
            <div className="
                min-w-0
                flex-1
            ">
                <div className="focus:outline-none">
                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-1
                    ">
                        <p className="
                            text-sm
                            font-medium
                            text-gray-900
                        ">
                            {user.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}