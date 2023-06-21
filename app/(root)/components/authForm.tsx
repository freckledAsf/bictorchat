'use client'

import { useState, useCallback, useEffect } from "react"
import {
    useForm,
    FieldValues,
    SubmitHandler,
} from 'react-hook-form'
import axios from "axios"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'
import Input from "@components/ui/input"
import Button from "@components/ui/button"
import AuthSocialButton from "./authSocialButton"
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Variant = 'login' | 'register'

export default function AuthForm() {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('login')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/conversations')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        setVariant(variant === 'login' ? 'register' : 'login')
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'register') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong!'))
            setIsLoading(false)
        }

        if (variant === 'login') {
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials')
                    return
                }
                toast.success('Logged in!')
                router.refresh()
            })
            setIsLoading(false)
        }
    }

    const socialSignIn = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials', {
                        className: 'dark:bg-gray-900'
                    })
                    return
                }
                toast.success('Logged in')
                router.push('/users')
            })
        setIsLoading(false)
    }

    return (
        <div className="
            bg-white
            rounded-md
            py-8
            px-6
            shadow
            sm:mx-auto
            sm:w-full
            sm:max-w-md
            dark:bg-gray-950
        ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {variant === 'register' && (
                    <Input
                        id="name"
                        label="Nombre"
                        register={register}
                        errors={errors}
                    />
                )}
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    autofocus
                    register={register}
                    errors={errors}
                />
                <Input
                    id="password"
                    label="Contraseña"
                    type="password"
                    register={register}
                    errors={errors}
                />
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                >
                    {variant === 'login' ? 'Inicia sesion' : 'Registrate'}
                </Button>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="
                        absolute
                        inset-0
                        flex
                        items-center
                    ">
                        <div className="
                            w-full 
                            border-t 
                            border-gray-400
                        "/>
                    </div>
                    <div className="
                        relative 
                        flex 
                        justify-center 
                        text-sm
                    ">
                        <span className="
                            bg-white
                            px-2
                            text-gray-400
                            dark:bg-gray-950
                        ">
                            O continua con
                        </span>
                    </div>
                </div>
                <div className="
                    mt-6 
                    flex
                    flex-col 
                    gap-2
                ">
                    <AuthSocialButton
                        icon={BsGithub}
                        onClick={() => socialSignIn('github')}
                    />
                    <AuthSocialButton
                        icon={BsGoogle}
                        onClick={() => socialSignIn('google')}
                    />
                </div>
            </div>
            <div className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-400
            ">
                <div>
                    {variant === 'login' ? 'Eres nuevo?' : 'Ya tienes una cuenta?'}
                </div>
                <div
                    onClick={toggleVariant}
                    className="underline cursor-pointer"
                >
                    {variant === 'login' ? 'Crea una cuenta' : 'Inicia sesion'}
                </div>
            </div>
        </div>
    )
}