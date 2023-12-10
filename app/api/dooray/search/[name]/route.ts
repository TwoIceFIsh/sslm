import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import { SearchDTO } from '@/app/types/SearchDTO';

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
    try {
        const result = await prismadb.setting.findUnique({ where: { sId: 1 } });
        const response = await fetch(
            `https://api.dooray.com/common/v1/members?name=${params.name}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `dooray-api ${result?.sToken}`,
                },
            },
        );

        if (response.ok) {
            const result: SearchDTO = await response.json();
            return NextResponse.json(result.result[0]);
        } else {
            console.log('400 GET user/search');
        }
    } catch (error) {
        if (error == TypeError) console.log('TypeError');
        return NextResponse.json('error');
    }
}
