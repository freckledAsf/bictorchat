'use client'

import clsx from "clsx"
import Link from "next/link"

interface Props {
    label: string,
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void,
}

export default function MobileItem({
    label,
    href,
    icon: Icon,
    active,
    onClick,
}: Props) {
    const handleClick = () => {
        if (onClick) return onClick()
    }
    return (
        <Link
            href={href}
            onClick={handleClick}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-gray-500
                hover:text-black
                hover:bg-gray-100
            `,
                active && 'bg-gray-100 text-black'
            )}
        >
            <Icon className="h-6 w-6" />
            <span className="sr-only">{label}</span>
        </Link>
    )
}