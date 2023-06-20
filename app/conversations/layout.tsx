import { ReactNode } from "react"
import getConversations from "@actions/getConversations"
import getUsers from "@actions/getUsers"
import Sidebar from "@components/sidebar/sidebar"
import ConversationList from './components/conversationList'

interface Props {
    children: ReactNode
}

export default async function ConversationsLayout({
    children
}: Props) {
    const conversations = await getConversations()
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}