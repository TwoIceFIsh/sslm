import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function GET(request: NextRequest, { params }: { params: { templateId: string } }) {
    try {
        const result = await prismadb.template.delete({
            where: { tId: Number(params.templateId) },
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}
