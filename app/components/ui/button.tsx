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
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
            `,
                secondary ? 'text-gray-950' : 'text-white',
                disabled && 'opacity-50 cursor-default',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600',
                className,
            )}
        >
            {children}
        </button>
    )
}