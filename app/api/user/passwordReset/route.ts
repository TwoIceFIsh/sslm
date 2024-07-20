import {NextResponse} from "next/server";

import db from "@/app/libs/db";
import {getMailContent, MailContent, transporter} from "@/lib/send-mail";
import {getRandomPassword} from "@/app/actinos/password/get-random-password";
import {getHashedPassword} from "@/app/actinos/password/get-hashed-password";

export async function POST(req: Request) {
    /*
    Resend.com function init - this is a helper function that will be used to send emails
    */
    try {
        const body = await req.json();
        const {email} = body;


        if (!email) {
            return new NextResponse("Email is required!", {
                status: 401,
            });
        }

        const password = getRandomPassword();

        const user = await db.users.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return new NextResponse("No user with that Email exist in Db!", {
                status: 401,
            });
        }

        const newpassword = await db.users.update({
            where: {id: user.id},
            data: {
                hashedPassword: await getHashedPassword(password),
            },
        });

        if (!newpassword) {
            return new NextResponse("Password not updated!", {
                status: 401,
            });
        } else {

            const mailContent: MailContent = {
                subject: "[인증] SSLM 임시 비밀번호를 확인해 주세요",
                html: `<div> 임시비밀번호 :  <br><a
             >               ${password}</a> </div>`,
                to: user.email as string,
            };

            await transporter.sendMail(getMailContent(mailContent));


            console.log(mailContent, "mailContent");
            console.log("Email sent to: " + user.email);
        }

        return NextResponse.json({message: "Password changed!", status: true});
    } catch (error) {
        console.log("[USER_PASSWORD_CHANGE_POST]", error);
        return new NextResponse("Initial error", {status: 500});
    }
}