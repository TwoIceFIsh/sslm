import './globals.css';
import AuthContext from '@/app/sslm/context/AuthContext';
import ToasterContext from '@/app/sslm/context/ToasterContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SSLM(SSL Management)',
    description: '인증서 관리 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthContext>
                    <ToasterContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
