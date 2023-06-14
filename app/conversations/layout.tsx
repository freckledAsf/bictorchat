import { ReactNode } from "react"
import getConversations from "../actions/getConversations"
import Sidebar from "@components/sidebar/sidebar"
import ConversationList from './components/conversationList'

interface Props {
    children: ReactNode
}

export default async function ConversationsLayout({
    children
}: Props) {
    const conversations = await getConversations()
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}