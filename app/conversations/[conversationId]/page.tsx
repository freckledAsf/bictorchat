import getConversationById from "@actions/getConversationById"
import getMessages from "@actions/getMessages"
import EmptyState from "@components/emptyState"
import Header from "./components/header"
import Body from "./components/body"
import Form from "./components/form"

interface Props {
    params: {
        conversationId: string,
    },
}

export default async function Conversation({
    params
}: Props) {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="
                lg:pl-80 h-full
            ">
                <div className="
                    h-full
                    flex
                    flex-col
                ">
                    <EmptyState />
                </div>
            </div>
        )
    }
    return (
        <div className="
            lg:pl-80
            h-full
        ">
            <div className="
                h-full
                flex
                flex-col
            ">
                <Header conversation={conversation} />
                <Body initialMessages={messages} isGroup={conversation.isGroup || false} />
                <Form />
            </div>
        </div>
    )
}