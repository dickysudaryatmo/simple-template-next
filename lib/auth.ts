import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { generateAccessToken } from "@/lib/jwt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) return null

        const passwordMatch = await compare(credentials.password, user.password)

        if (!passwordMatch) return null

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.accessToken = generateAccessToken(user) // 👈 custom token
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.accessToken = token.accessToken // 👈 custom token
      }
      return session
    },
    async signOut() {
      // Custom sign out logic if needed
      return true
    },
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
//   pages: {
//     signIn: '/login'
//   }
  pages: {
    signIn: '/login',
    error: '/error',
    newUser: '/register'
  },
}

export default NextAuth(authOptions)