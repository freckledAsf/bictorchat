'use client'

import { User } from "@prisma/client"
import { useState } from "react"
import useRoutes from "@hooks/useRoutes"
import SettingsModal from './settingsModal'
import DesktopItem from "./desktopItem"
import Avatar from "@components/avatar"

interface Props {
    user: User,
}

export default function DesktopSidebar({
    user
}: Props) {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <SettingsModal
                user={user}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="
                hidden
                lg:fixed
                lg:inset-y-0
                lg:left-0
                lg:z-40
                lg:w-20
                xl:px-6
                lg:overflow-y-auto
                lg:bg-white
                lg:border-r
                lg:pb-4
                lg:flex
                lg:flex-col
                lg:justify-between
                dark:lg:bg-gray-900
                dark:lg:border-gray-700
            ">
                <nav className="
                    mt-4
                    flex
                    flex-col
                    justify-between
                ">
                    <ul
                        role="list"
                        className="
                            flex
                            flex-col
                            items-center
                            space-y-1
                        "
                    >
                        {routes.map(item =>
                            <DesktopItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                                danger={item.danger}
                            />
                        )}
                    </ul>
                </nav>
                <nav className="
                    mt-4
                    flex
                    flex-col
                    justify-between
                    items-center
                ">
                    <div
                        onClick={() => setIsOpen(true)}
                        className="
                            cursor-pointer
                            hover:opacity-75
                            transition
                        "
                    >
                        <Avatar user={user} />
                    </div>
                </nav>
            </div>
        </>
    )
}