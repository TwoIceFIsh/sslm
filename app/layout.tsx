import {Metadata} from 'next';
import {Inter as FontSans} from 'next/font/google';
import {cn} from '@/lib/utils';
import React from 'react';
import '@/app/globals.css';
import AuthContext from '@/app/sslm/context/AuthContext';
import {Toaster} from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'SSLM(SSL Management)',
    description: '인증서 관리 시스템',
};

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={cn(
                'h-full min-h-screen font-sans antialiased',
                fontSans.variable,
            )}
        >
        <AuthContext className={"h-full"}>
            <Toaster/>
            <div className={'h-full'}> {children}</div>
        </AuthContext>
        </body>
        </html>
    );
}