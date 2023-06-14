'use client'

import clsx from 'clsx'
import Link from 'next/link'

interface Props {
    label: string,
    icon: any,
    href: string,
    onClick?: () => void,
    active?: boolean,
}

export default function DesktopItem({
    label,
    icon: Icon,
    href,
    onClick,
    active
}: Props) {
    const handleClick = () => {
        if (onClick) return onClick()
    }
    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-gray-300
                    hover:text-gray-950
                    hover:bg-gray-100
                    dark:bg-gray-900
                    dark:text-gray-400
                    dark:hover:bg-gray-950
                    dark:hover:text-gray-300
                `,
                    active && 'bg-gray-100 text-black'
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className='sr-only'>{label}</span>
            </Link>
        </li>
    )
}