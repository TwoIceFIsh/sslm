import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import makePrivacy from '@/app/actinos/privacy';

export async function GET(request: NextRequest) {
    try {
        const result = await prismadb.domain.findMany({});
        const promises = result.map(async (data) => {
            data.dEmail = await makePrivacy(data.dEmail as string, 'email');
            data.dOwner = await makePrivacy(data.dOwner as string, 'name');
        });
        await Promise.all(promises);
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    console.log('MAKE DOMAIN');
    try {
        const data = await request.json();
        data.dId = undefined;
        const result = await prismadb.domain.create({
            data: data,
        });
        return NextResponse.json(result);
    } catch (e) {
        if (process.env.NODE_ENV === 'development') {
            console.log(e);
        }
        return NextResponse.json([]);
    }
}
