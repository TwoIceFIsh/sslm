"use server"
import db from "@/app/libs/db";
import {currentUser} from "@/app/libs/current-user";

export const fetchTemplate = async (templateId: string) => {
    const user = await currentUser()
    const template = await db.template.findFirst({
        where: {
            tId: Number(templateId),
            usersId: user?.id
        }
    })
    return template
}