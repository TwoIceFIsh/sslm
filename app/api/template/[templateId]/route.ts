import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import { Template } from '@/app/types/Template';

export async function GET(request: NextRequest, { params }: { params: { templateId: string } }) {
    try {
        const result = await prismadb.template.findUnique({
            where: { tId: Number(params.templateId) },
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest, { params }: { params: { templateId: string } }) {
    try {
        const data: Template = await request.json();
        const result = await prismadb.template.update({
            where: { tId: Number(params.templateId) },
            data: data,
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}
