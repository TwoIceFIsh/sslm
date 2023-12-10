import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import writeLog from '@/app/actinos/write-log';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const { id } = await request.json();
    const session = await getServerSession(authOptions);

    const id_user = await prismadb.user.findUnique({
        where: {
            id: id,
        },
    });
    if (id_user?.email === session?.user?.email) return NextResponse.json({ result: false });

    const result = await prismadb.user.delete({
        where: {
            id: id,
        },
    });
    if (result.id) {
        writeLog(`User ${result.name} 삭제`);
        return NextResponse.json({ result: true });
    } else return NextResponse.json({ result: false });
}
