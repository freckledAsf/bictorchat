import AuthContext from '@context/authContext'
import ToasterContext from '@context/toasterContext'
import ActiveStatus from '@context/activeStatus'

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bictor Chat',
  description: 'A messaging app built by Victor Tamayo',
  icons: {
    icon: 'icon.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className='h-screen'
    >
      <body className={`h-full ${inter.className}`}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
