import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import { Email } from '@/app/types/Email';
import { Domain } from '@/app/types/Domain';
import { Template } from '@/app/types/Template';
import { keywordReplace } from '@/app/actinos/keyword-replace';
import writeLog from '@/app/actinos/write-log';
import nodemailer from 'nodemailer';

export async function GET(
    request: NextRequest,
    { params }: { params: { dId: string; tId: string } },
) {
    try {
        const dId = Number(params.dId);
        const tId = Number(params.tId);
        if (dId !== 0 && tId !== 0) {
            const [dResult, tResult] = await Promise.all([
                prismadb.domain.findUnique({ where: { dId } }),
                prismadb.template.findUnique({ where: { tId } }),
            ]);
            if (dResult && tResult) {
                const mailData = keywordReplace(dResult as Domain, tResult as Template);

                const data: Email = {
                    to: dResult.dEmail as string,
                    subject: mailData.tTitle as string,
                    html: mailData.tContext as string,
                };

                const result = await sendEmail(data);
                console.log(result);
                if (result) {
                    await writeLog(`${dResult.dName}님에게 ${mailData.tTitle} 이메일 발송`);
                    return NextResponse.json({ result: true });
                } else {
                    await writeLog(`${dResult.dName}님에게 ${mailData.tTitle} 이메일 발송 실패`);
                    return NextResponse.json({ result: false });
                }
            } else {
                await writeLog(`${dResult?.dName}님에게 ${tResult?.tTitle} 이메일 발송 에러`);
                return NextResponse.json({ result: false });
            }
        } else {
            const result = await prismadb.setting.findUnique({
                where: {
                    sId: 1,
                },
            });

            if (result) {
                const data: Email = {
                    to: result.sEmail,
                    subject: '[SSLM] 이메일 발송 테스트 - 성공',
                    html: '이메일 발송 테스트 입니다',
                };

                const resultBool = await sendEmail(data);
                return NextResponse.json({ result: resultBool });
            }
        }
    } catch (e) {
        await writeLog(`이메일 발송 실패`);
        return NextResponse.json({ result: false });
    }
    await writeLog(`이메일 발송 실패`);
    return NextResponse.json({ result: false });
}

const sendEmail = async (data: Email) => {
    const settingData = await prismadb.setting.findUnique({ where: { sId: 1 } });
    if (settingData != null) {
        const transporter = nodemailer.createTransport({
            host: settingData?.sServer,
            port: Number(settingData?.sPort),
            secure: settingData.sSsl as boolean,
            auth: {
                user: settingData?.sEmail,
                pass: settingData?.sPassword,
            },
        });
        try {
            await transporter.sendMail({
                from: settingData?.sEmail,
                ...data,
            });
            await writeLog(`테스트 메일 발송 성공`);
            return true;
        } catch (e) {
            await writeLog(`이메일 발송 실패 서버세팅 수정 필요`);
            return false;
        }
    } else {
        await writeLog(`이메일 발송 실패 설정 값 미존재`);
        return false;
    }
};
