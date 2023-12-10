import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const result = await prismadb.headerData.deleteMany();
        return NextResponse.json(result);
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}
