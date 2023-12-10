import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function GET(request: NextRequest, { params }: { params: { hId: string } }) {
    try {
        const result = await prismadb.headerData.delete({
            where: { hId: Number(params.hId) },
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}
