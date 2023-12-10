import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function GET(request: NextRequest, { params }: { params: { domainId: string } }) {
    try {
        const result = await prismadb.domain.delete({
            where: { dId: Number(params.domainId) },
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}
