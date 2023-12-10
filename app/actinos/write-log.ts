'use server';
import prismadb from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function writeLog(lText: string) {
    const session = await getServerSession(authOptions);
    if (session?.user != undefined) {
        const result = await prismadb.log.create({
            data: {
                lText: lText,
                lUser: session.user.name as string | 'No Data',
            },
        });
    }
}
