import {NextRequest, NextResponse} from "next/server";
import db from "@/app/libs/db";


export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
    const user = await db.users.update({
        data: {
            isActivated: false
        },
        where: {id: params.id},
    });
    if (!user) {
        return new NextResponse("User not found", {
            status: 404,
        });
    }
    return NextResponse.json({result: true})
}