"use server"
import {z} from "zod";
import {DomainSchema} from "@/app/schema/domain-schema";
import db from "@/app/libs/db";
import {currentUser} from "@/app/libs/current-user";

export const newDomain = async (values: z.infer<typeof DomainSchema>) => {
    const user = await currentUser()
    const validatedFields = DomainSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: '부적절한 입력값'};
    }
    const data = await db.domain.create({
        data: {
            dName: values.dName,
            dType: values.dType,
            dOwner: values.dOwner,
            dEmail: values.dEmail,
            dDate: values.dDate,
            usersId: user?.id
        }
    })
    if (data == null) {
        return {error: null};
    }
    return {success: true};
};