'use client'

// import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <main>{children}</main>
    </ThemeProvider>
  )
}

export default Providers
