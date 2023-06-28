import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toast'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'

import MobileMenu from '@/components/MobileMenu'
import Providers from '@/components/Providers'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const ComponentWithNoSSR = dynamic(
    () => import('@/components/Providers'),
    { ssr: false }
  );
  
  return (
    <html
      lang='en'
      className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className='min-h-screen bg-slate-50 dark:bg-black antialiased'>
        <ComponentWithNoSSR>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <Toaster position='bottom-right' />

          {/* <MobileMenu /> */}

          <main>{children}</main>
        </ComponentWithNoSSR>

        {/* Allow more height for mobile menu on mobile */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  )
}
