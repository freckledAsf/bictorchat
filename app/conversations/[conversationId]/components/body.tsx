'use client'

import { useEffect, useRef, useState } from "react"
import useConversation from "@hooks/useConversation"
import { FullMessageType } from "@types"
import axios from "axios"
import MessageBox from "./messageBox"
import { pusherClient } from "@/app/lib/pusher"
import { find } from "lodash"

interface Props {
    initialMessages: FullMessageType[],
    isGroup: boolean,
}

export default function Body({
    initialMessages,
    isGroup,
}: Props) {
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef.current?.scrollIntoView()

        const newHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages(current => {
                if (find(current, { id: message.id })) {
                    return current
                }
                return [...current, message]
            })
            bottomRef.current?.scrollIntoView()
        }

        const updateHandler = (message: FullMessageType) => {
            setMessages(current => current.map(item => {
                if (item.id === message.id) {
                    return message
                }
                return item
            }))
        }

        pusherClient.bind('messages:new', newHandler)
        pusherClient.bind('messages:update', updateHandler)
        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new', newHandler)
            pusherClient.unbind('messages:update', updateHandler)
        }
    }, [conversationId])

    return (
        <div className="
            flex-1
            overflow-y-auto
            space-y-2
            bg-[#E2DAD6]
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-stone-400
            dark:bg-gray-950
            dark:scrollbar-thumb-gray-800
        ">
            <div className="
                z-0
                fixed
                h-full
                w-full
                opacity-5
                bg-[url('/bg.png')]
                invert
                dark:opacity-10
                dark:invert-0
            "/>
            {messages.map((item, i) => (
                <MessageBox
                    key={item.id}
                    lastMessage={i > 0 ? messages[i - 1] : null}
                    isLast={i === messages.length - 1}
                    isGroup={isGroup}
                    data={item}
                />
            ))}
            <div
                ref={bottomRef}
                className="pt-2"
            />
        </div>
    )
}