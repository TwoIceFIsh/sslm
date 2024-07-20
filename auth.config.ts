import {SignInSchema} from "@/app/schema/sign-in-schema";
import {getUserByEmail} from "@/app/actinos/get-user-by-email";
import {comparePassword} from "@/app/actinos/compare-password";
import Google from "next-auth/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {NextAuthConfig} from "next-auth";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = SignInSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user.data || !user?.data?.hashedPassword) return null;
                    const passwordsMatch = await comparePassword(
                        password,
                        user?.data?.hashedPassword,
                    );
                    console.log('passwordsMatch', passwordsMatch);
                    if (passwordsMatch) {
                        return user.data;
                    }
                }
                return null;
            },
        }),

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
} satisfies NextAuthConfig;