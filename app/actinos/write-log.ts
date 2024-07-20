'use server';
import db from '@/app/libs/db';
import {auth} from '@/auth';

export default async function writeLog(lText: string) {
    const session = await auth();

    if (session?.user != undefined) {
        const result = await db.logs.create({
            data: {
                text: lText,
                userId: session.user.id as string | 'No Data',
            },
        });
    }
}