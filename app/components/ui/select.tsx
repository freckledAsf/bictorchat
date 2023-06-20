'use client'

import ReactSelect from 'react-select'

interface Props {
    label: string,
    value?: Record<string, any>,
    onChange: (value: Record<string, any>) => void,
    options: Record<string, any>[],
    disabled?: boolean
}

export default function Select({
    label,
    value,
    onChange,
    options,
    disabled
}: Props) {
    return (
        <div className="z-[100]">
            <label
                htmlFor=""
                className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                "
            >
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999
                        })
                    }}
                    classNames={{
                        control: () => 'text-sm'
                    }}
                />
            </div>
        </div>
    )
}