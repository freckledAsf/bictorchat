'use client'

import ReactSelect from 'react-select'

interface Props {
    id: string,
    label: string,
    value?: Record<string, any>,
    onChange: (value: Record<string, any>) => void,
    options: Record<string, any>[],
    disabled?: boolean
}

export default function Select({
    id,
    label,
    value,
    onChange,
    options,
    disabled
}: Props) {
    return (
        <div className="z-[100]">
            <label
                htmlFor={id}
                className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                    dark:text-gray-400
                "
            >
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect
                    id={id}
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    placeholder=""
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999
                        })
                    }}
                    classNames={{
                        control: () => `
                                text-sm
                                !border-0
                                ring-1
                                ring-inset
                                ring-gray-300
                                !rounded-md
                                focus:!ring-2
                                focus:!ring-sky-600
                                dark:ring-gray-700
                                dark:!bg-gray-800
                                dark:hover:!bg-gray-900
                            `
                    }}
                />
            </div>
        </div>
    )
}