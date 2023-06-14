import Image from 'next/image'
import AuthForm from './(root)/components/authForm'

export default function Home() {
  return (
    <main className='
        h-full
        flex
        flex-col
        items-center
        justify-center
        bg-gray-200
        dark:bg-gray-900
        gap-6
      '
    >
      <div>
        <Image
          width={48}
          height={48}
          src='/logo.svg'
          alt='logo'
          priority
          className='mx-auto'
        />
        <h2 className='
          mt-6
          text-xl
          text-center
          font-bold
          tracking-tight
          text-gray-950
          dark:text-gray-200
        '>
          WE ARE LIVE BITCHEEES!!!
        </h2>
      </div>
      <AuthForm />
    </main>
  )
}
