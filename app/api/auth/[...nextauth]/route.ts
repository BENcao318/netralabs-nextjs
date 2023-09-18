import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
// import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
  callbacks: {
    session: async ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin,
          name: token.name,
        },
      }
    },
    jwt: async ({ token, user, trigger, session }) => {
      // console.log('JWT Callback', { token, user })
      if (trigger === 'update') {
        token.name = session.name
      }
      if (user) {
        const u = user as unknown as User
        return {
          ...token,
          id: u.id,
          isAdmin: u.isAdmin,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
