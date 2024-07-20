// auth.ts
import {PrismaAdapter} from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import {jwtGetUserById} from '@/app/actinos/jwt-get-user-by-id';
import {getUserByEmail} from '@/app/actinos/get-user-by-email';
import db from '@/app/libs/db';
import {signOutBasic} from "@/lib/sign-out";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/',
    },
    callbacks: {
        async session({token, session}) {
            if (!session) await signOutBasic();

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await jwtGetUserById(token.sub as string);

            if (!existingUser) return token;

            token.name = existingUser?.name as string;
            token.email = existingUser?.email as string;

            token.role = existingUser?.role as string;

            return token;
        },
        async signIn({user, account}) {
            // OAuth인 경우 이로직을 타고 true로 흐름을 흘려보내서 로그인 성공하게 한다!
            if (account?.provider !== 'credentials') {
                return true;
            }

            const existingUser = await getUserByEmail(user.email as string);

            if (existingUser.result) {
                await db.logs.create({
                    data: {
                        userId: existingUser?.data?.id,
                        text: `${existingUser?.data?.email} 로그인`
                    },
                })
            }
            return existingUser.result;
        },
    },
    jwt: {
        maxAge: 60 * 60, // 1 hour
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1 hour
        updateAge: 60, // 1 minute
    },
    ...authConfig,
});