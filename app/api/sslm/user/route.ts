import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import User from '@/app/types/User';
import writeLog from '@/app/actinos/write-log';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    const result = await prismadb.user.findMany();

    const users: User[] = [];
    result.map((user) => {
        users.push({
            id: user.id,
            name: user.name as string,
            email: user.email as string,
            password: '',
            created_at: user.createdAt as Date,
            isVarified: user.isVarified,
        });
    });

    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const { id, email, isVarified } = await request.json();
    const session = await getServerSession(authOptions);

    if (email === (session?.user?.email as string)) return NextResponse.json({ result: false });

    const result = await prismadb.user.update({
        data: {
            isVarified: isVarified,
        },
        where: {
            id: id,
        },
    });
    if (result.id) {
        writeLog(`User ${result.name} 로그인 ${result.isVarified ? '허용' : '차단'}`);
        return NextResponse.json({ result: true });
    }
    return NextResponse.json({ result: false });
}
