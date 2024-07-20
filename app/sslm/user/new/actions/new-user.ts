"use server"
import db from "@/app/libs/db";
import {getHashedPassword} from "@/app/actinos/password/get-hashed-password";
import {z} from "zod";
import {UserSchema} from "@/app/schema/user-schema";

export async function saveUser(values: z.infer<typeof UserSchema>) {
    // Extract and validate data from formData

    const validatedFields = UserSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: '부적절한 입력값'};
    }

    const user = await db.users.findFirst({
        where: {
            email: validatedFields.data.email
        }
    })
    if (!user) {
        await db.users.create({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                hashedPassword: await getHashedPassword(validatedFields.data.password as string) as string,
                isActivated: true,
                role: 'user'
            }
        })
        return {success: true}
    } else {
        console.log('이미 존재하는 이메일입니다.')
        return {success: false}
    }
}