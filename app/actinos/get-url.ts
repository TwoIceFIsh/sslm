export const getURL = (): string | undefined => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.NEXT_PUBLIC_DEV_URL;
    } else {
        return process.env.NEXT_PUBLIC_PROD_URL;
    }
    // 서버 사이드 코드에서 환경 변수를 사용하려면 여기에 처리 로직을 추가하세요.
};

export default getURL;
