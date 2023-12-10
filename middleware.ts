import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware(req) {}, {
    pages: {
        signIn: '/',
    },
});

export const config = {
    matcher: ['/sslm/:path*'],
};
