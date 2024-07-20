'use server';

import {ResponseData} from '@/app/actinos/response-data';
import db from '@/app/libs/db';

/**
 * getUserByEmail - 이메일을 이용하여 해당 유저를 찾습니다.
 * @param email - 유저의 이메일
 */
export const getUserByEmail = async (email: string) => {
    if (email?.includes('%40')) email = email.replace(/%40/g, '@');
    const user = await db.users.findFirst({
        where: {email},
    });
    if (user)
        return ResponseData(user, true);
    else {
        return ResponseData(null, false);
    }
};