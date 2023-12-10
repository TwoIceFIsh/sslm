import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import { keywordReplace } from '@/app/actinos/keyword-replace';
import { Domain } from '@/app/types/Domain';
import { Template } from '@/app/types/Template';
import { getSession } from 'next-auth/react';
import writeLog from '@/app/actinos/write-log';

export async function GET(
    request: NextRequest,
    { params }: { params: { dId: string; tId: string } },
) {
    try {
        console.log('MESSAGE API');
        const result = await prismadb.setting.findUnique({
            where: {
                sId: 1,
            },
        });
        const domainData = await prismadb.domain.findUnique({
            where: { dId: Number(params.dId) },
        });
        const templateData = await prismadb.template.findUnique({
            where: { tId: Number(params.tId) },
        });

        if (domainData != null && templateData != null && domainData.dOwner != null) {
            // dooray 유저 정보 파싱하기 메시지 전송에 필요한 id 값 추출
            const response = await fetch(
                `https://api.dooray.com/common/v1/members?name=${
                    domainData.dOwner.split('(')[1].split(')')[0] as string
                }`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `dooray-api ${result?.sToken}`,
                    },
                },
            );
            const rdata = await response.json();
            const domainDataAfter = keywordReplace(domainData as Domain, templateData as Template);
            let randomStr = Math.random().toString(36).substring(2, 5);
            if (result != null) {
                const doorayData = {
                    text: domainDataAfter.tContext + ' (알림발송ID: ' + randomStr + ')',
                    organizationMemberId: rdata.result[0].id,
                };
                const response = await fetch(
                    `https://api.dooray.com/messenger/v1/channels/direct-send`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `dooray-api ${result.sToken}`,
                        },
                        body: JSON.stringify(doorayData),
                    },
                );
                if (response.ok) {
                    const session = await getSession();
                    await writeLog(
                        `${domainData.dName}도메인 담당자 ${domainData.dOwner}에게 ${templateData.tTitle} 템플릿으로 메시지를 보냈습니다.`,
                    );
                }
                return NextResponse.json({ result: true });
            } else {
                await writeLog(
                    `${domainData.dName}도메인 담당자 ${domainData.dOwner}에게 ${templateData.tTitle} 템플릿으로 메시지 전송 실패.`,
                );
                return NextResponse.json({ result: false });
            }
        }
    } catch (error) {
        await writeLog(`템플릿으로 메시지 전송 실패`);
        throw new Error('메시지 전송 실패');
    }
}
