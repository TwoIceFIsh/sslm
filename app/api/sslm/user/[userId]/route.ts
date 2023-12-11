import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import User from '@/app/types/User';
import writeLog from '@/app/actinos/write-log';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserInfo from '@/app/types/UserInfo';
import bcrypt from 'bcrypt';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const result = await prismadb.user.findUnique({
        where: { id: params.userId },
    });
    return NextResponse.json({
        userId: result?.id,
        userName: result?.name,
        userEmail: result?.email,
    });
}

export async function POST(request: NextRequest) {
    const userInfo: UserInfo = await request.json();
    const session = await getServerSession(authOptions);
    const hashedPassword = await bcrypt.hash(userInfo.userPassword, 12);

    if (userInfo.userEmail !== (session?.user?.email as string))
        return NextResponse.json({ result: false });

    const result = await prismadb.user.update({
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
        return NextResponse.json({ result: true });
    }
    await writeLog(`User ${result.name} 정보 수정 실패`);
    return NextResponse.json({ result: false });
}
