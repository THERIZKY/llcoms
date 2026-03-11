import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@/generated/prisma/enums";
import { isGoogleAuthEnabled } from "@/auth/email";
import { loginSchema } from "@/auth/validation";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

const adapter = PrismaAdapter(
  prisma as unknown as Parameters<typeof PrismaAdapter>[0],
) as unknown as Adapter;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  trustHost: true,
  secret:
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV !== "production"
      ? "local-dev-auth-secret-change-me"
      : undefined),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: parsedCredentials.data.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            password: true,
            emailVerified: true,
          },
        });

        if (!user?.password || !user.emailVerified) {
          return null;
        }

        const passwordMatches = await verifyPassword(
          parsedCredentials.data.password,
          user.password,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
        };
      },
    }),
    ...(isGoogleAuthEnabled()
      ? [
          Google({
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return Boolean(user.emailVerified);
      }

      if (account?.provider === "google" && user.email) {
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            emailVerified: user.emailVerified ?? new Date(),
            role: user.role ?? UserRole.user,
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? UserRole.user;
        token.emailVerified = user.emailVerified
          ? user.emailVerified.toISOString()
          : null;
      }

      if (token.sub && (!token.role || token.emailVerified === undefined)) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            role: true,
            emailVerified: true,
          },
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.emailVerified = dbUser.emailVerified
            ? dbUser.emailVerified.toISOString()
            : null;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as UserRole | undefined) ?? UserRole.user;
        session.user.emailVerified =
          typeof token.emailVerified === "string"
            ? new Date(token.emailVerified)
            : null;
      }

      return session;
    },
  },
});

export { isGoogleAuthEnabled };
