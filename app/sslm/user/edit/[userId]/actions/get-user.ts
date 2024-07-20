"use server"
import db from "@/app/libs/db";

export async function getUser(userId: string) {


    const user = await db.users.findFirst({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    if (!user) {
        return null
    } else {
        return user

    }
}