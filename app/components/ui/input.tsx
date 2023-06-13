'use client'

import {
    UseFormRegister,
    FieldValues,
    FieldErrors,
} from 'react-hook-form'
import clsx from "clsx"

interface Props {
    id: string,
    label: string,
    type?: string,
    autofocus?: boolean,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
}

export default function Input({
    id,
    label,
    type,
    autofocus,
    disabled,
    register,
    errors,
}: Props) {
    return (
        <div>
            <label
                htmlFor={id}
                className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-950
                "
            >
                {label}
            </label>
            <input
                id={id}
                type={type ?? 'text'}
                autoFocus={autofocus}
                autoComplete={id}
                disabled={disabled}
                {...register(id)}
                className={clsx(`
                        mt-2
                        form-input
                        block 
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-950
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-900
                        focus:ring-2
                        focus:ring-sky-600
                    `,
                    errors[id] && 'focus:ring-rose-500',
                    disabled && 'opacity-50 cursor-default',
                )}
            />
        </div>
    )
}