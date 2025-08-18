'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  const registered = searchParams.get('registered')

  const [safeCallbackUrl, setSafeCallbackUrl] = useState('/dashboard')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl')
    let url = '/dashboard'
    
    if (callbackUrl) {
      try {
        // Simple path validation without URL parsing
        const decodedUrl = decodeURIComponent(callbackUrl)
        if (!decodedUrl.startsWith('/login') && !decodedUrl.startsWith('/register')) {
          url = decodedUrl
        }
      } catch (e) {
        console.error('Invalid callback URL', e)
      }
    }
    
    setSafeCallbackUrl(url)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // setError('')

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: safeCallbackUrl
    })
    console.log(result);
    
    if (result?.error) {
      // setError(result.error)
      toast.error('Error ' + result.error);
      setIsLoading(false)
    } else {
      router.push(safeCallbackUrl)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      {isLoading && <LoadingOverlay />}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid gap-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            {/* {registered && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Registration successful! Please login.
              </div>
            )} */}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
              <Button type="submit" className="w-full cursor-pointer">
                {isLoading ? 'Signing in...' : 'Login'}
              </Button>
            </form>
            
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline hover:text-primary">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}