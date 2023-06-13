'use client'

import { useState, useCallback } from "react"
import {
    useForm,
    FieldValues,
    SubmitHandler,
} from 'react-hook-form'
import Input from "@/app/components/ui/input"
import Button from "@/app/components/ui/button"
import AuthSocialButton from "./authSocialButton"
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Variant = 'login' | 'register'

export default function AuthForm() {
    const [variant, setVariant] = useState<Variant>('login')
    const [isLoading, setIsLoading] = useState(false)

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

        if (variant === 'login') {
            // nextauth
        }

        if (variant === 'register') {
            // axios
        }
    }

    const socialSignIn = (action: string) => {
        setIsLoading(true)

        //nextauth social
    }

    return (
        <div className="
            bg-white
            rounded-md
            p-8
            shadow
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {variant === 'register' && (
                    <Input
                        id="name"
                        label="Name"
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
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                />
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                >
                    {variant === 'login' ? 'Sign in' : 'Register'}
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
                        ">
                            Or continue with
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
                text-gray-500
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