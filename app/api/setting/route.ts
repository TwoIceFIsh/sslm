import prismadb from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { Setting } from '@/app/types/Setting';

export async function GET(request: NextRequest) {
    const result = await prismadb.setting.findUnique({
        where: {
            sId: 1,
        },
    });

    if (result) {
        result.sToken = '';
        result.sPassword = '';
        return NextResponse.json(result);
    } else {
        return NextResponse.json({});
    }
}

export async function POST(request: NextRequest) {
    const data: Setting = await request.json();
    const settingData = await prismadb.setting.findUnique({
        where: { sId: 1 },
    });

    if (settingData) {
        if (data.sPassword === '') {
            data.sPassword = settingData.sPassword;
        }
        if (data.sToken === '') {
            data.sToken = settingData.sToken as string;
        }
        const result = await prismadb.setting.update({
            data: data,
            where: {
                sId: 1,
            },
        });
        return NextResponse.json({ result: 'success' });
    } else {
        const result = await prismadb.setting.create({
            data: data,
        });
        return NextResponse.json({ result: 'success' });
    }
}
