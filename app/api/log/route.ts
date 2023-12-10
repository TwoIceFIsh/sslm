import prismadb from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { Log } from '@/app/types/Log';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    try {
        const data = await prismadb.log.findMany({
            take: 20,
            orderBy: [
                {
                    lId: 'desc',
                },
            ],
        });

        const result: Log[] = [];

        data.forEach((log) => {
            result.push({
                lId: log.lId,
                lDate: log.lDate?.toLocaleString() as string,
                lText: log.lText as string,
                lUser: log.lUser as string,
            });
        });

        return NextResponse.json(result);
    } catch (e) {
        throw new Error('로그 조회 실패');
    }
}
