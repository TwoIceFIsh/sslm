"use server"
import {currentUser} from "@/app/libs/current-user";
import db from "@/app/libs/db";

interface Template {
    tTitle: string
    tType: string
    tContext: string
    tId: number
}

export const saveTemplate = async (templateId: string, dataToSave: Template) => {
    const user = await currentUser()
    const template = await db.template.findFirst({
        where: {
            tId: Number(templateId),
            usersId: user?.id
        }
    })
    if (template) {
        await db.template.update({
            where: {
                tId: Number(templateId)
            },
            data: dataToSave
        })
        return {success: true}

    }
    return {error: false}

}