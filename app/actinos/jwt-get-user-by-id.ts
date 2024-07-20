'use server';

import db from '@/app/libs/db';

/**
 * jwtGetUserById - JWT 토큰을 사용하여 사용자를 가져옵니다.
 *
 * @param id - 사용자 ID
 * */
export const jwtGetUserById = async (id: string | undefined) => {
    try {
        return db.users.findUnique({
            where: {
                id,
            },
        });
    } catch {
        return null;
    }
};