import bcrypt from "bcryptjs";

/**
 *  비밀번호를 해싱합니다.
 *
 *  @param {string} password
 *  */
export const getHashedPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};