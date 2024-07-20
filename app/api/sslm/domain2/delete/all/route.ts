import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import {currentUser} from "@/app/libs/current-user";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const user = await currentUser()
        const result = await db.headerData.deleteMany({
            where: {
                usersId: user?.id
            }
        });
        return NextResponse.json(result);
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}