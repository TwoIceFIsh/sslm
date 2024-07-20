import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import {Email} from '@/app/types/Email';
import {Domain} from '@/app/types/Domain';
import {Template} from '@/app/types/Template';
import {keywordReplace} from '@/app/actinos/keyword-replace';
import writeLog from '@/app/actinos/write-log';
import nodemailer from 'nodemailer';
import {currentUser} from "@/app/libs/current-user";

export async function GET(
    request: NextRequest,
    {params}: { params: { dId: string; tId: string } },
) {
    try {
        const dId = Number(params.dId);
        const tId = Number(params.tId);
        const [dResult, tResult] = await Promise.all([
            db.domain.findUnique({where: {dId}}),
            db.template.findUnique({where: {tId}}),
        ]);
        if (dResult && tResult) {
            const mailData = keywordReplace(dResult as Domain, tResult as Template);

            const data: Email = {
                to: dResult.dEmail as string,
                subject: mailData.tTitle as string,
                html: mailData.tContext as string,
            };

            const result = await sendEmail(data);
            if (result) {
                await writeLog(`${dResult.dName}님에게 ${mailData.tTitle} 이메일 발송`);
                return NextResponse.json({result: true});
            } else {
                await writeLog(`${dResult.dName}님에게 ${mailData.tTitle} 이메일 발송 실패`);
                return NextResponse.json({result: false});
            }
        } else {
            await writeLog(`${dResult?.dName}님에게 ${tResult?.tTitle} 이메일 발송 에러`);
            return NextResponse.json({result: false});
        }

    } catch (e) {
        await writeLog(`이메일 발송 실패`);
        return NextResponse.json({result: false});
    }
}

const sendEmail = async (data: Email) => {
    const user = await currentUser()
    const settingData = await db.settings.findUnique({where: {userId: user?.id}});
    if (settingData != null) {
        const transporter = nodemailer.createTransport({
            host: settingData?.mail_server,
            port: Number(settingData?.mail_port),
            secure: settingData.activeSsl as boolean,
            auth: {
                user: settingData?.mail_email,
                pass: settingData?.mail_password,
            },
        });
        try {
            await transporter.sendMail({
                from: settingData?.mail_email,
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