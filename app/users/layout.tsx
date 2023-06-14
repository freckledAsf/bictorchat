import getUsers from "@actions/getUsers"
import { ReactNode } from "react"
import Sidebar from "@components/sidebar/sidebar"
import UserList from "./components/userList"

interface Props {
    children: ReactNode,
}

export default async function UsersLayout({ children }: Props) {
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-full">
                <UserList users={users} />
                {children}
            </div>
        </Sidebar>
    )
}