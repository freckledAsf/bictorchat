'use client'

import { Fragment, ReactNode } from "react"
import { Transition, Dialog } from '@headlessui/react'
import { IoClose } from "react-icons/io5"
import clsx from "clsx"

interface Props {
    fit?: boolean,
    isOpen?: boolean,
    onClose: () => void,
    children: ReactNode,
}

export default function Modal({
    fit,
    isOpen,
    onClose,
    children,
}: Props) {
    return (
        <Transition.Root
            show={isOpen ?? false}
            as={Fragment}
        >
            <Dialog
                as="div"
                onClose={onClose}
                className='
                    relative
                    z-50
                '
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="
                        fixed
                        inset-0
                        bg-gray-600
                        bg-opacity-75
                        transition-opacity
                    "/>
                </Transition.Child>
                <div className="
                    fixed
                    inset-0
                    z-10
                    overflow-y-auto
                ">
                    <div className="
                        flex
                        min-h-full
                        items-center
                        justify-center
                        p-4
                        text-center
                        sm:p-0
                    ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={clsx(`
                                relative
                                transform
                                overflow-hidden
                                rounded-lg
                                bg-white
                                px-4
                                pb-4
                                text-left
                                shadow-xl
                                transition-all
                                sm:my-8
                                sm:p-6
                            `,
                                fit ? 'w-fit' : 'w-full max-w-lg'
                            )}>
                                <div className="
                                absolute
                                right-0
                                top-0
                                hidden
                                pr-4
                                pt-4
                                sm:block
                                z-10
                            ">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="
                                        rounded-md
                                        bg-white
                                        text-gray-400
                                        hover:text-gray-500
                                        focus:outline-none 
                                        focus:ring-2
                                        focus:ring-sky-500
                                        focus:ring-offset-2
                                    "
                                    >
                                        <span className="sr-only">Close Panel</span>
                                        <IoClose
                                            className="
                                            h-6
                                            w-6
                                        "
                                        />
                                    </button>
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}