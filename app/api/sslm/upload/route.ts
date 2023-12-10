import { NextRequest, NextResponse } from 'next/server';
import { read, utils } from 'xlsx';
import prismadb from '@/app/libs/prismadb';
import { HeaderData } from '@/app/types/HeaderData';
import int2Date from '@/app/actinos/int-2-date';

export async function POST(request: NextRequest, response: NextResponse) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) NextResponse.json({ success: false });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const rows = read2xlsx(buffer);
    for (const row of rows) {
        const rowData = row as HeaderData;
        if (rowData == undefined) {
            console.log('rowData is undefined');
        } else {
            if (rowData.hCost == null) rowData.hCost = 0;
            const result = await prismadb.headerData.create({
                data: {
                    hStatus: rowData.hStatus,
                    hDomain: rowData.hDomain,
                    hProject: rowData.hProject,
                    hType: rowData.hType,
                    hCustomer: rowData.hCustomer,
                    hRenew: rowData.hRenew,
                    hContract: rowData.hContract,
                    hIssue: int2Date(rowData.hIssue),
                    hExpire: int2Date(rowData.hExpire),
                    hContractExpire: int2Date(rowData.hContractExpire),
                    hCost: rowData.hCost,
                    hBuyer: rowData.hBuyer,
                    hManager: rowData.hManager,
                    hActor: rowData.hActor,
                    hPurpose: rowData.hPurpose,
                    hWebType: rowData.hWebType,
                    hWebServer: rowData.hWebServer,
                    hDomainServerIp: rowData.hDomainServerIp,
                    hMemo: rowData.hMemo,
                },
            });
        }
    }
    if (Number(data) > 0) {
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
}

function read2xlsx(buffer: Buffer) {
    const workbook = read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return utils.sheet_to_json(sheet, {
        defval: null,
    });
}
