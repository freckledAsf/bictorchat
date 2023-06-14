'use client'

import { Conversation } from "@prisma/client"

interface Props {
    data: Conversation,
    selected: boolean,
}

export default function ConversationItem({
    data,
    selected
}: Props) {
    return (
        <></>
    )
}