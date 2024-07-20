import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import {Domain} from '@/app/types/Domain';

export async function GET(request: NextRequest, {params}: { params: { domainId: string } }) {
    try {
        const result = await db.domain.findUnique({
            where: {dId: Number(params.domainId)},
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest, {params}: { params: { domainId: string } }) {
    console.log('DOMAIN EDIT');
    try {
        const data: Domain = await request.json();
        const result = await db.domain.update({
            where: {dId: Number(params.domainId)},
            data: data,
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}