import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  // If logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard')
  }
  
  // If not logged in, redirect to login WITHOUT callbackUrl
  redirect('/login')
}