"use server"

import {redirect} from 'next/navigation'
import db from "@/app/libs/db";
import {currentUser} from "@/app/libs/current-user";


export const createEmptyTemplate = async () => {
    const user = await currentUser()
    const template = await db.template.create({
        data: {
            tTitle: '새로운 템플릿',
            tType: '이메일',
            tContext: '',
            tDate: new Date(),
            usersId: user?.id
        }
    })
    if (template)
        redirect('/sslm/template/edit/' + template.tId)
};