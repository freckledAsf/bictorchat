'use client'

import Modal from "@components/modal"
import Image from "next/image"

interface Props {
    src: string,
    isOpen?: boolean,
    onClose: () => void,
}

export default function ImageModal({
    src,
    isOpen,
    onClose
}: Props) {
    if (!src) return null
    return (
        <Modal
            fit
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="
                h-80
                w-80
                mx-auto
            ">
                <Image
                    fill
                    src={src}
                    alt="Image"
                    className="object-cover"
                />
            </div>
        </Modal>
    )
}