import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: string;
    status: string;
    subType: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      status: string;
      subType: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    status: string;
    subType: string | null;
  }
}