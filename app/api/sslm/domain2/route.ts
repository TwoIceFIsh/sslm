import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import { HeaderData } from '@/app/types/HeaderData';
import date2Int from '@/app/actinos/date-2-int';

export async function GET(request: NextRequest) {
    try {
        const result = await prismadb.headerData.findMany({ where: { hIsDeleted: false } });
        const headerDataList: HeaderData[] = [];
        for (const data of result) {
            const headerDate: HeaderData = {
                hId: data.hId,
                hStatus: data.hStatus ? data.hStatus : 'N',
                hDomain: data.hDomain ? data.hDomain : '',
                hProject: data.hProject ? data.hProject : '',
                hType: data.hType ? data.hType : '',
                hCustomer: data.hCustomer ? data.hCustomer : '',
                hRenew: data.hRenew ? data.hRenew : '',
                hContract: data.hContract ? data.hContract : '',
                hIssue: data.hIssue ? date2Int(data.hIssue) : 0,
                hExpire: data.hExpire ? date2Int(data.hExpire) : 0,
                hContractExpire: data.hContractExpire ? date2Int(data.hContractExpire) : 0,
                hCost: data.hCost ? data.hCost : 0,
                hBuyer: data.hBuyer ? data.hBuyer : '',
                hManager: data.hManager ? data.hManager : '',
                hActor: data.hActor ? data.hActor : '',
                hPurpose: data.hPurpose ? data.hPurpose : '',
                hWebType: data.hWebType ? data.hWebType : '',
                hWebServer: data.hWebServer ? data.hWebServer : '',
                hDomainServerIp: data.hDomainServerIp ? data.hDomainServerIp : '',
                hMemo: data.hMemo ? data.hMemo : '',
                hIsDeleted: data.hIsDeleted ? data.hIsDeleted : false,
            };
            headerDataList.push(headerDate);
        }

        return NextResponse.json(headerDataList);
    } catch (e) {
        console.log(e);
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    try {
        const result = await prismadb.headerData.create({
            data: data,
        });
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({ status: 'error' });
    }
}
