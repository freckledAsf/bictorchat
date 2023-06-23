'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import { User } from "@prisma/client"
import Modal from "@components/modal"
import Input from "@components/ui/input"
import Select from "@components/ui/select"
import Button from "@/app/components/ui/button"

interface Props {
    users: User[],
    isOpen?: boolean,
    onClose: () => void,
}

export default function GroupChatModal({
    users,
    isOpen,
    onClose,
}: Props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })
    const members = watch('members')

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
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
                        pb-10
                    ">
                        <h2 className="
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                            dark:text-gray-100
                        ">
                            Create a group chat
                        </h2>
                        <p className="
                            mt-1
                            text-sm
                            leading-6
                            text-gray-600
                            dark:text-gray-300
                        ">
                            Create a chat with more than 2 people
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
                            <Select
                                id="members"
                                label="Members"
                                disabled={isLoading}
                                options={users.map(item => ({
                                    value: item.id,
                                    label: item.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
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
                        onClick={onClose}
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}