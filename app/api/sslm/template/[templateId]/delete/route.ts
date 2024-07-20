import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';

export async function GET(request: NextRequest, {params}: { params: { templateId: string } }) {
    try {
        const result = await db.template.delete({
            where: {tId: Number(params.templateId)},
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}