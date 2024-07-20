import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';

export async function POST(request: NextRequest, {params}: { params: { hId: string } }) {
    const data = await request.json();
    try {
        const result = await db.headerData.update({
            where: {hId: Number(params.hId)},
            data: data,
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}