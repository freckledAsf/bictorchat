'use client'

import useConversation from "@hooks/useConversation"
import {
    useForm,
    FieldValues,
    SubmitHandler
} from "react-hook-form"
import axios from "axios"
import MessageInput from "./messageInput"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import { CldUploadButton } from "next-cloudinary"

export default function Form() {
    const { conversationId } = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return (
        <div className="
            p-4
            bg-white
            border-t
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        ">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset={"pneqq6q4"}
            >
                <HiPhoto
                    size={30}
                    className="text-sky-500"
                />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    items-center
                    gap-2
                    lg:gap-4
                    w-full
                "
            >
                <MessageInput
                    id="message"
                    required
                    placeholder="Write a message"
                    register={register}
                    errors={errors}
                />
                <button
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-sky-500
                        cursor-pointer
                        transition
                        hover:bg-sky-600
                    "
                >
                    <HiPaperAirplane
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    )
}