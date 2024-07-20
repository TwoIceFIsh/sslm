import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import {currentUser} from "@/app/libs/current-user";

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser()
        const result = await db.template.findMany({
            where: {
                usersId: user?.id
            }
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser()

        const data = await request.json();
        const result = await db.template.create({
            data: {
                tTitle: data.tTitle,
                tType: data.tType,
                tContext: data.tContext,
                tDate: new Date(),
                usersId: user?.id
            }
        });

        return NextResponse.json(result);
    } catch (e) {
        console.log(e);
        return NextResponse.json([]);
    }
}