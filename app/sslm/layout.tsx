import '@/app/globals.css';
import type { Metadata } from 'next';
import Header from '@/app/sslm/components/Header';
import Sidebar from '@/app/sslm/components/Sidebar';
import Footer from '@/app/sslm/components/Footer';

export const metadata: Metadata = {
    title: 'SSLM(SSL Management)',
    description: '인증서 관리 시스템',
};

export default function DomainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 overflow-x-hidden">
                <Sidebar />
                {children}
            </div>
            <Footer />
        </div>
    );
}
