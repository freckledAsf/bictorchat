'use client'

import { ReactNode } from "react"
import clsx from 'clsx'

interface Props {
    type?: 'button' | 'submit' | 'reset',
    secondary?: boolean,
    disabled?: boolean,
    danger?: boolean,
    onClick?: () => void,
    className?: string,
    children: ReactNode,
}

export default function Button({
    type,
    secondary,
    disabled,
    danger,
    onClick,
    className,
    children,
}: Props) {
    return (
        <button
            type={type ?? 'button'}
            disabled={disabled}
            onClick={onClick}
            className={clsx(`
                flex
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                focus-visible:ring-2
            `,
                secondary ? 'text-gray-950 outline outline-1 outline-gray-200 transition hover:outline-gray-500 dark:text-gray-200 dark:outline-gray-800 dark:hover:outline-gray-400' : 'text-gray-100 focus-visible:ring-gray-800 dark:text-gray-200 dark:focus-visible:ring-gray-400',
                disabled && 'opacity-50 cursor-default',
                danger && 'font-semibold text-gray-100 bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                !secondary && !danger && 'font-semibold bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700',
                className,
            )}
        >
            {children}
        </button>
    )
}