type CommentKey = 'LOGO_FILE' | 'COMMENT1' | 'COMMENT2' | 'COMMENT3' | 'EMAIL_DOMAIN' | 'VERSION';

const commentMappings: Record<CommentKey, string> = {
    LOGO_FILE: process.env.NEXT_PUBLIC_LOGO_FILE || '',
    COMMENT1: process.env.NEXT_PUBLIC_COMMENT1 || '',
    COMMENT2: process.env.NEXT_PUBLIC_COMMENT2 || '',
    COMMENT3: process.env.NEXT_PUBLIC_COMMENT3 || '',
    EMAIL_DOMAIN: process.env.NEXT_PUBLIC_EMAIL_DOMAIN || '',
    VERSION: process.env.NEXT_PUBLIC_VERSION || '',
};

export const getInitMain = (comment: CommentKey): string => {
    return commentMappings[comment];
};

export default getInitMain;
