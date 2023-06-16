import { FullMessageType } from "@/app/types"
import { useSession } from "next-auth/react"
import Avatar from "@components/avatar"
import clsx from "clsx"
import { format } from "date-fns"
import Image from "next/image"
import { useCallback, useEffect, useMemo } from "react"

interface Props {
    isLast?: boolean,
    isGroup?: boolean,
    data: FullMessageType
}

export default function MessageBox({
    isLast,
    isGroup,
    data,
}: Props) {
    const session = useSession()

    const isOwn = session?.data?.user?.email === data?.sender?.email

    const seenList = (data?.seen || [])
        .filter(user => user.email !== data?.sender?.email)
        .map(user => user.name)
        .join(', ')

    const isLink = useMemo(() => {
        if (!data?.body) return false
        try {
            const url = new URL(data.body)
            return url.protocol === 'http:' || url.protocol === 'https:'
        } catch (error) {
            return false
        }
    }, [data?.body])


    const wrapper = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    )

    const avatar = isOwn ? "order-2" : ""

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? "bg-emerald-400 text-white" : "bg-gray-100",
        data.image ? "rounded-xl p-2" : "rounded-full py-2 px-3"
    )

    return (
        <div className={wrapper}>
            {isGroup && !isOwn && (
                <div className={avatar}>
                    <Avatar user={data.sender} />
                </div>
            )}
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {`${isOwn ? 'Yo' : data.sender.name}`}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image
                            alt="Image"
                            height={288}
                            width={288}
                            src={data.image}
                            className="
                                object-cover
                                cursor-pointer
                                transition
                                translate
                            "
                        />
                    ) : isLink ? (
                        <div>
                            <a
                                href={data.body!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    hover:underline
                                "
                            >
                                {data.body}
                            </a>
                        </div>
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="
                        text-xs
                        font-light
                        text-gray-500
                    ">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}