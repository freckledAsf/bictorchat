'use client'

import { useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FullConversationType } from "@types"
import useOtherUser from "@hooks/useOtherUser"
import format from "date-fns/format"
import clsx from "clsx"
import Avatar from "@components/avatar"
import AvatarGroup from "@components/avatarGroup"

interface Props {
    data: FullConversationType,
    selected?: boolean,
}

export default function ConversationItem({
    data,
    selected
}: Props) {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []
        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const isSeen = useMemo(() => {
        if (!lastMessage) return false
        if (!userEmail) return false
        const seenArray = lastMessage.seen || []
        return seenArray.filter(user => user.email === userEmail).length !== 0
    }, [lastMessage, userEmail])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return <i>Sent an image</i>
        if (lastMessage?.body) return lastMessage.body
        return <i>Started a conversation</i>
    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className={clsx(`
                w-full
                relative
                flex
                items-center
                space-x-3
                hover:bg-gray-100
                rounded-lg
                transition
                cursor-pointer
                p-3
            `,
                selected ? 'bg-neutral-100' : 'bg-white'
            )}
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}
            <div className="
                min-w-0 flex-1
            ">
                <div className="focus:outline-none">
                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-1
                    ">
                        <p className="
                            text-md
                            font-medium
                            text-gray-900
                        ">
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="
                                text-xs
                                text-gray-400
                                font-light
                            ">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`
                        truncate
                        text-sm
                    `,
                        isSeen ? 'text-gray-500' : 'text-black font-medium'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}