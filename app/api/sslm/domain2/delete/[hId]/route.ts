import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';

export async function GET(request: NextRequest, {params}: { params: { hId: string } }) {
    try {
        const result = await db.headerData.delete({
            where: {hId: Number(params.hId)},
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}