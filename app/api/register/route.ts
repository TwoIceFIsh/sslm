import bcrypt from 'bcrypt';

import prismadb from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    const userId = email.split('@')[0];

    const data = await prismadb.user.findMany({});
    if (data.length == 0) {
        try {
            await prismadb.user.create({
                data: {
                    email: email,
                    name: name,
                    hashedPassword: hashedPassword,
                    isVarified: true,
                },
            });
            return NextResponse.json({ result: true });
        } catch (e) {
            throw new Error('최초 계정 생성 실패');
        }
    } else {
        try {
            await prismadb.user.create({
                data: {
                    email: email,
                    name: name,
                    hashedPassword: hashedPassword,
                },
            });
            return NextResponse.json({ result: true });
        } catch (e) {
            throw new Error('아이디 및 비밀번호를 제대로 확인해 주세요');
        }
    }
}
