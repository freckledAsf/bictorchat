import Image from 'next/image'
import AuthForm from './components/authForm'

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
            width={64}
            height={64}
            src={'/icon.svg'}
            alt='logo'
            priority
            className='mx-auto'
          />
        <h2 className='
          mt-6
          text-3xl
          text-center
          font-bold
          tracking-tight
          text-gray-950
          dark:text-gray-300
        '>
          Inicia sesion en tu cuenta
        </h2>
      </div>
      <AuthForm />
    </main>
  )
}
