import {NextResponse} from "next/server";
import db from "@/app/libs/db";

export async function POST(
    req: Request,
    {params}: { params: { moduleId: string } }
) {
    try {
        const user = await db.system_Modules_Enabled.update({
            where: {
                id: params.moduleId,
            },
            data: {
                enabled: false,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log("[USERACTIVATE_POST]", error);
        return new NextResponse("Initial error", {status: 500});
    }
}