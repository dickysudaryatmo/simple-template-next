// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import './globals.css'
// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'My App',
//   description: 'Aplikasi dengan Next.js dan Shadcn UI',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//       </body>
//     </html>
//   )
// }
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My App',
  description: 'Aplikasi dengan Next.js dan Shadcn UI',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}