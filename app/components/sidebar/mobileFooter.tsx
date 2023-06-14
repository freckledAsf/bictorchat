'use client'

import useConversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./mobileItem"

export default function MobileFooter() {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if (isOpen) return null

    return (
        <div className="
            fixed
            justify-between
            w-full
            bottom-0
            z-40
            flex
            items-center
            bg-white
            border-t
            lg:hidden
        ">
            {routes.map(item =>
                <MobileItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                />
            )}
        </div>
    )
}