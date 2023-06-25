'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface Props {
    id: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
}

export default function MessageInput({
    id,
    type,
    placeholder,
    required,
    register,
    errors,
}: Props) {
    return (
        <div className="
            relative
            w-full
        ">
            <input
                id={id}
                type={type || "text"}
                required={required}
                placeholder={placeholder || ""}
                autoComplete={id}
                {...register(id, { required })}
                className="
                    text-gray-950
                    font-light
                    py-2
                    px-4
                    bg-gray-100
                    w-full
                    rounded-full
                    focus:outline-none
                    break-words
                    dark:bg-gray-800
                    dark:text-gray-200
                    dark:placeholder:text-gray-400
                "
            />
        </div>
    )
}