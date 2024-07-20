import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import writeLog from '@/app/actinos/write-log';
import UserInfo from '@/app/types/UserInfo';
import {auth} from '@/auth';
import {getHashedPassword} from "@/app/actinos/password/get-hashed-password";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, {params}: { params: { userId: string } }) {
    const result = await db.users.findUnique({
        where: {id: params.userId},
    });
    return NextResponse.json({
        userId: result?.id,
        userName: result?.name,
        userEmail: result?.email,
    });
}

export async function POST(request: NextRequest) {
    const userInfo: UserInfo = await request.json();
    const session = await auth();
    const hashedPassword = await getHashedPassword(userInfo.userPassword)

    if (userInfo.userEmail !== (session?.user?.email as string))
        return NextResponse.json({result: false});

    const result = await db.users.update({
        data: {
            name: userInfo.userName,
            hashedPassword: hashedPassword,
        },
        where: {
            email: userInfo.userEmail,
        },
    });
    if (result.id) {
        await writeLog(`User ${result.name} 정보 수정 완료`);
        return NextResponse.json({result: true});
    }
    await writeLog(`User ${result.name} 정보 수정 실패`);
    return NextResponse.json({result: false});
}