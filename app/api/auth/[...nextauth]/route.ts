import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { hash } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signIn",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
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
      };
    },
    jwt: async ({ token, user, trigger, session, account }) => {
      // console.log('JWT Callback', { token, user })
      if (account && account.provider === "github") {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });
        if (!dbUser) {
          // Create a new user in the database for first time github login
          const hashedPassword = await hash(generateRandomPassword(12), 10);
          await prisma.user.create({
            data: {
              name: user.name as string,
              email: user.email as string,
              password: hashedPassword,
              userPreference: {
                create: {},
              },
            },
            include: {
              userPreference: true,
            },
          });
        }

        user.id = dbUser?.id as string;
      }

      if (trigger === "update") {
        token.name = session.name;
      }
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
          isAdmin: u.isAdmin,
        };
      }
      return token;
    },
  },
};

const generateRandomPassword = (length: number) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
