'use client'

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Modal from "../modal"
import Input from "../ui/input"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import Button from "../ui/button"

interface Props {
    isOpen?: boolean,
    onClose: () => void,
    user: User,
}

export default function SettingsModal({
    isOpen,
    onClose,
    user
}: Props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: user?.name,
            image: user?.image,
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/settings', data)
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => toast.error('Something went wrong'))
        setIsLoading(false)
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="
                        border-b
                        border-gray-900/10
                        pb-12
                    ">
                        <h2 className="
                            text-base
                            font-sembiold
                            leading-7
                            text-gray-900
                            dark:text-gray-100
                        ">
                            Profile
                        </h2>
                        <p className="
                            mt-1
                            text-sm
                            leading-6
                            text-gray-600
                            dark:text-gray-300
                        ">
                            Edit your information
                        </p>
                        <div className="
                            mt-10
                            flex
                            flex-col
                            gap-y-8
                        ">
                            <Input
                                label="Name"
                                id="name"
                                disabled={isLoading}
                                required
                                register={register}
                                errors={errors}
                            />
                            <div>
                                <label
                                    htmlFor="image"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        leading-6
                                        text-gray-900
                                    "
                                >
                                    <div className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-x-3
                                    ">
                                        <Image
                                            width={48}
                                            height={48}
                                            src={image || user?.image || `https://avatar.vercel.sh/${user.name}`}
                                            alt="Avatar"
                                            className="rounded-full"
                                        />
                                        <CldUploadButton
                                            options={{ maxFiles: 1 }}
                                            onUpload={handleUpload}
                                            uploadPreset={"pneqq6q4"}
                                        >
                                            <Button
                                                disabled={isLoading}
                                                secondary
                                            >
                                                Change
                                            </Button>
                                        </CldUploadButton>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="
                        mt-6
                        flex
                        items-center
                        justify-end
                        gap-x-6
                    ">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}