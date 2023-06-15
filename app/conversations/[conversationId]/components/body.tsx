'use client'

import { useEffect, useRef, useState } from "react"
import useConversation from "@hooks/useConversation"
import { FullMessageType } from "@types"
import axios from "axios"
import MessageBox from "./messageBox"

interface Props {
    initialMessages: FullMessageType[]
}

export default function Body({
    initialMessages
}: Props) {
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <div className="
            flex-1
            overflow-y-auto
        ">
            {messages.map((item, i) => (
                <MessageBox
                    key={item.id}
                    isLast={i === messages.length - 1}
                    data={item}
                />
            ))}
            <div 
                ref={bottomRef} 
                className="pt-24" 
            />
        </div>
    )
}