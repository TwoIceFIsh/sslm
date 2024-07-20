import {z} from 'zod';

let passwordReg = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/);

/**
 * zod의 SignInSchema를 통해 유효성 검사를 진행합니다.
 * */
export const UserSchema = z.object({

    email: z.string().email({
        message: '올바른 이메일 주소가 아닙니다',
    }),
    name: z.string().min(2, {
        message: '이름은 최소 2자 이상이어야 합니다',
    }),

    password: z.optional(z
        .string()
        .min(8, {
            message: '비밀번호는 최소 8자 이상이어야 합니다',
        })
        .regex(passwordReg, {
            message: '비밀번호는 반드시 하나 이상의 문자와 숫자를 포함해야 합니다',
        })),
});