"use server"
import db from "@/app/libs/db";
import {getHashedPassword} from "@/app/actinos/password/get-hashed-password";
import {z} from "zod";
import {EditSchema} from "@/app/schema/edit-user-schema";

export async function editUser(values: z.infer<typeof EditSchema>) {
    // Extract and validate data from formData
    console.log(values)
    const validatedFields = EditSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: '부적절한 입력값'};
    }

    // 비밀번호가 공란이 아니면 비밀번호를 해싱하여 저장
    if (validatedFields.data.password !== '') {
        await db.users.update({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                hashedPassword: await getHashedPassword(validatedFields.data.password as string) as string,
            },
            where: {
                id: validatedFields.data.id
            }
        })
        return {success: true}
    } else {
        await db.users.update({
            data: {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
            },
            where: {
                id: validatedFields.data.id
            }
        })
        return {success: true}
    }

}