import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Fetch user + their profile in one query
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            brandProfile: true,
            influencerProfile: true,
          },
        });

        if (!user || !user.password) {
          throw new Error('No account found with this email');
        }

        if (user.status === 'suspended') {
          throw new Error('Your account has been suspended');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // Log the login event
        await prisma.authSession.create({
          data: {
            userId: user.id,
            event: 'login',
            provider: 'email',
            ipAddress: req.headers?.['x-forwarded-for']?.toString() || null,
            userAgent: req.headers?.['user-agent'] || null,
          },
        });

        // Update lastLoginAt
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          subType: user.brandProfile?.subType ?? null,
        };
      },
    }),

    // ── SOCIAL LOGIN V2 ──────────────────────────────
    // GoogleProvider({ clientId: ..., clientSecret: ... }),
    // FacebookProvider({ clientId: ..., clientSecret: ... }),
    // ────────────────────────────────────────────────
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id       = user.id;
        token.role     = (user as any).role;
        token.status   = (user as any).status;
        token.subType  = (user as any).subType;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id      = token.id as string;
        session.user.role    = token.role as string;
        session.user.status  = token.status as string;
        session.user.subType = token.subType as string | null;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};