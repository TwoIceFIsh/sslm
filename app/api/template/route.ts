import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function GET(request: NextRequest) {
    try {
        const result = await prismadb.template.findMany({});
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    console.log('MAKE TEMPLATE');
    try {
        const data = await request.json();
        data.tId = undefined;
        const result = await prismadb.template.create({
            data: data,
        });

        return NextResponse.json(result);
    } catch (e) {
        console.log(e);
        return NextResponse.json([]);
    }
}
