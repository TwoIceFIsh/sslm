import {NextRequest, NextResponse} from 'next/server';
import db from '@/app/libs/db';
import {SearchDTO} from '@/app/types/SearchDTO';
import {currentUser} from "@/app/libs/current-user";

export async function GET(request: NextRequest, {params}: { params: { name: string } }) {
    try {
        const user = await currentUser()
        const result = await db.settings.findUnique({
            include: {
                Dooray: true
            }, where: {userId: user?.id}
        });
        const response = await fetch(
            `https://api.dooray.com/common/v1/members?name=${params.name}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `dooray-api ${result?.Dooray?.token}`,
                },
            },
        );

        if (response.ok) {
            const result: SearchDTO = await response.json();
            return NextResponse.json(result.result[0]);
        } else {
            console.log('400 GET user/search');
        }
    } catch (error) {
        if (error == TypeError) console.log('TypeError');
        return NextResponse.json('error');
    }
}