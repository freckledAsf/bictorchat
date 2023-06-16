'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import useConversation from "@hooks/useConversation"
import { FullConversationType } from "@types"
import ConversationItem from "./conversationItem"
import { MdOutlineGroupAdd } from 'react-icons/md'
import clsx from "clsx"

interface Props {
    initialItems: FullConversationType[]
}

export default function ConversationList({
    initialItems
}: Props) {
    const [items, setItems] = useState(initialItems)
    const router = useRouter()
    const { conversationId, isOpen } = useConversation()
    return (
        <aside className={clsx(`
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            overflow-y-auto
            border-r
            border-gray-200
            invisible
            lg:visible
        `,
            //isOpen ? 'invisible' : 'block w-full left-0'
        )}>
            <div className="px-5">
                <div className="
                    flex
                    justify-between
                    mb-4
                    pt-4
                ">
                    <div className="
                        text-2xl
                        font-bold
                        text-neutral-800
                    ">
                        Mensajes
                    </div>
                    <div
                        onClick={() => console.log()}
                        className="
                            rounded-full
                            p-2
                            bg-gray-100
                            text-gray-600
                            cursor-pointer
                            hover:opacity-75
                            transition
                        "
                    >
                        <MdOutlineGroupAdd size={20} />
                    </div>
                </div>
                <div className="space-y-2">
                    {items.map(item =>
                        <ConversationItem
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    )}
                </div>
            </div>
        </aside>
    )
}