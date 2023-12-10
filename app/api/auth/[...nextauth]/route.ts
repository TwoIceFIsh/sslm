import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';

import prismadb from '@/app/libs/prismadb';
import { randomBytes, randomUUID } from 'crypto';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismadb),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('아이디 및 비밀번호를 제대로 입력해 주세요');
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                        isVarified: true,
                    },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('아이디 및 비밀번호를 제대로 확인해 주세요');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                );

                if (!isCorrectPassword) {
                    throw new Error('비밀번호 불일치');
                }
                await prismadb.log.create({
                    data: {
                        lText: `${user.name}님이 로그인 하셨습니다.`,
                        lUser: (user.name as string) || '',
                    },
                });
                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString('hex');
        },
        maxAge: 600, // 10m
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
        newUser: '/',
    },
    callbacks: {
        async session({ session, token, user }) {
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
