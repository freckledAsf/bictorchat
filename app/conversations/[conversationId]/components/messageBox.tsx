import { useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { FullMessageType } from "@/app/types"
import Avatar from "@components/avatar"
import clsx from "clsx"
import { format } from "date-fns"
import ImageModal from './imageModal'
import Image from "next/image"

interface Props {
    isLast?: boolean,
    isGroup?: boolean,
    lastMessage: FullMessageType | null,
    data: FullMessageType,
}

export default function MessageBox({
    isLast,
    isGroup,
    lastMessage,
    data,
}: Props) {
    const session = useSession()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)

    const isOwn = useMemo(() =>
        session?.data?.user?.email === data?.sender?.email
        , [session?.data?.user?.email, data?.sender?.email])

    const isLastMessageOwn = useMemo(() =>
        data?.sender?.email === lastMessage?.sender?.email
        , [data?.sender?.email, lastMessage?.sender?.email])

    const isLastMessageDiffTime = useMemo(() => {
        if (!lastMessage?.createdAt || !data?.createdAt) return false
        const date = new Date(lastMessage.createdAt)
        date.setMinutes(date.getMinutes() + 5)
        return date.getTime() < new Date(data.createdAt).getTime()
    }, [lastMessage?.createdAt, data?.createdAt])

    const isLastMessageDiffDay = useMemo(() => {
        if (!lastMessage?.createdAt || !data?.createdAt) return true
        return new Date(lastMessage.createdAt).getDate() !== new Date(data.createdAt).getDate()
    }, [lastMessage?.createdAt, data?.createdAt])

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
        "flex gap-3 px-4",
        isOwn && "justify-end"
    )

    const body = clsx(
        "flex flex-col w-full",
        isOwn && "items-end"
    )

    const message = clsx(
        "text-sm overflow-hidden w-fit selection:bg-gray-700 selection:text-white",
        isOwn ? "bg-emerald-500 text-white dark:bg-emerald-600 dark:text-gray-200" : "bg-white dark:bg-gray-800 dark:text-gray-300",
        data.image ? "p-2 rounded-xl" : "rounded-3xl py-2 px-3 break-words max-w-[85%] sm:max-w-[75%]"
    )

    return (
        <div className="
            relative
            flex 
            flex-col
            z-10
        ">
            {isLastMessageDiffDay && (
                <div className="
                    bg-gray-200
                    text-sm 
                    text-center 
                    text-gray-700
                    mx-auto
                    my-4
                    px-4 
                    py-1
                    rounded-full
                    dark:bg-gray-900
                    dark:text-gray-500
                ">
                    {format(new Date(data.createdAt), 'PP')}
                </div>
            )}

            <div className={wrapper}>
                {(isGroup && !isOwn && !isLastMessageOwn) && (
                    <div>
                        <Avatar user={data.sender} />
                    </div>
                )}
                <div className={body}>
                    {(!isLastMessageOwn || isLastMessageDiffDay || isLastMessageDiffTime) && (
                        <div className="
                            flex 
                            items-center 
                            gap-1
                            mb-2
                        ">
                            <div className="
                                text-sm 
                                text-gray-600
                                dark:text-gray-400
                            ">
                                {`${isOwn ? 'Yo' : data.sender.name}`}
                            </div>
                            <div className="
                                text-xs 
                                mt-[2px]
                                text-gray-500
                                dark:text-gray-500
                            ">
                                {format(new Date(data.createdAt), 'p')}
                            </div>
                        </div>
                    )}
                    <div className={message}>
                        {data.image ? (
                            <>
                                <ImageModal
                                    src={data.image}
                                    isOpen={isImageModalOpen}
                                    onClose={() => setIsImageModalOpen(false)}
                                />
                                <Image
                                    height={288}
                                    width={288}
                                    src={data.image}
                                    alt="Image"
                                    onClick={() => setIsImageModalOpen(true)}
                                    className="
                                        object-cover
                                        cursor-pointer
                                        rounded-lg
                                    "
                                />
                            </>
                        ) : isLink ? (
                            <div>
                                <a
                                    href={data.body!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {data.body}
                                </a>
                            </div>
                        ) : (
                            <div>{data.body}</div>
                        )}
                    </div>
                    {(isLast && isOwn && seenList.length > 0) && (
                        <div className="
                            text-xs
                            font-light
                            text-gray-500
                            mt-1
                            mr-1
                            italic
                        ">
                            Seen {isGroup && `by ${seenList}`}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}