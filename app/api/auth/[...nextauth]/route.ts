import NextAuth from "next-auth/next"
import { authOptions } from "@/lib/auth"
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { generateAccessToken } from "@/lib/jwt"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const { username, password } = credentials ?? {}

//         // Dummy auth — ganti dengan DB logic
//         if (username === "admin" && password === "secret") {
//           return {
//             id: "1",
//             name: "Admin",
//             email: "admin@example.com",
//             role: "admin",
//           }
//         }

//         return null
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user
//         token.accessToken = generateAccessToken(user) // 👈 custom token
//       }
//       return token
//     },
//     async session({ session, token }) {
//       session.user = token.user
//       session.accessToken = token.accessToken
//       return session
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// })

// export { handler as GET, handler as POST }
