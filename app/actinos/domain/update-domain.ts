"use server"
import {z} from "zod";
import {DomainSchema} from "@/app/schema/domain-schema";
import db from "@/app/libs/db";

export const updateDomain = async (values: z.infer<typeof DomainSchema>) => {
    const validatedFields = DomainSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: '부적절한 입력값'};
    }
    const domain = await db.domain.findUnique({
        where: {
            dId: values.dId
        }
    })


    if (domain) {
        const data = await db.domain.update({
            data: {
                dName: values.dName,
                dType: values.dType,
                dOwner: values.dOwner,
                dEmail: values.dEmail,
                dDate: values.dDate,
            },
            where: {
                dId: values.dId
            }
        })
        if (data == null) {
            return {error: null};
        }
        return {success: true};
    }
    return {success: true};
};