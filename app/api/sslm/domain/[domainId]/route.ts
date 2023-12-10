import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import { Domain } from '@/app/types/Domain';

export async function GET(request: NextRequest, { params }: { params: { domainId: string } }) {
    try {
        const result = await prismadb.domain.findUnique({
            where: { dId: Number(params.domainId) },
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest, { params }: { params: { domainId: string } }) {
    console.log('DOMAIN EDIT');
    try {
        const data: Domain = await request.json();
        const result = await prismadb.domain.update({
            where: { dId: Number(params.domainId) },
            data: data,
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}
