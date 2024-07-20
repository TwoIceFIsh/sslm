import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';

export async function GET(request: NextRequest, {params}: { params: { domainId: string } }) {
    try {
        const result = await db.domain.delete({
            where: {dId: Number(params.domainId)},
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}