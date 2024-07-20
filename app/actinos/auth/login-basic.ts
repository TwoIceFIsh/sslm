'use server';

import {signIn} from '@/auth';
import {DEFAULT_LOGIN_REDIRECT} from '@/route';
import {z} from 'zod';
import {AuthError} from 'next-auth';

import {getUserByEmail} from '@/app/actinos/get-user-by-email';
import {SignInSchema} from '@/app/schema/sign-in-schema';

/**
 * loginBasic - 이메일과 비밀번호로 로그인합니다.
 *
 * @param values - email, password
 * */
export const loginBasic = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: '부적절한 입력값'};
    }
    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser?.result) {
        return {error: JSON.stringify(existingUser)};
    }
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: '계정 정보 불일치'};

                default:
                    return {
                        error: '계정 정보 불일치!',
                    };
            }
        }
        return {success: true};
    }
};