import {type DefaultSession} from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
    role: string;
    tag: string;
    name: string;
    group: string;
    id: string;
    email: string;
    image: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    username: string;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        role: string;
        tag: string;
        name: string;
        group: string;
        id: string;
        email: string;
        image: string;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
        username: string;
    }
}