import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import {Template} from '@/app/types/Template';

export async function GET(request: NextRequest, {params}: { params: { templateId: string } }) {
    try {
        const result = await db.template.findUnique({
            where: {tId: Number(params.templateId)},
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.error();
    }
}

function convertStringToDate(dateString: string): Date {
    const parts = dateString.split('.').map(part => part.trim()); // Split and trim
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Subtract 1 for 0-indexed months
    const day = parseInt(parts[2], 10);

    return new Date(year, month, day);
}

export async function POST(request: NextRequest, {params}: { params: { templateId: string } }) {
    console.log('UPDATE TEMPLATE');
    console.log(params);
    const data: Template = await request.json();
    const dateObject = convertStringToDate(data.tDate as unknown as string);
    console.log(data, dateObject);
    console.log(data, dateObject);

    const result = await db.template.update({
        where: {tId: Number(params.templateId)},
        data: {
            tTitle: data.tTitle,
            tType: data.tType,
            tContext: data.tContext,
            tDate: dateObject,
        },
    });
    console.log(result);
    return NextResponse.json(result);

}