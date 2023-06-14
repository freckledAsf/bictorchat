import { ReactNode } from "react"
import getCurrentUser from "@actions/getCurrentUser"
import DesktopSidebar from './desktopSidebar'
import MobileFooter from './mobileFooter'

interface Props {
    children: ReactNode,
}

export default async function Sidebar({ children }: Props) {
    const currentUser = await getCurrentUser()
    return (
        <div className="h-full">
            <DesktopSidebar user={currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}