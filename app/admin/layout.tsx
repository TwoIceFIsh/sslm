import type {Metadata} from 'next';
import Header from '@/app/sslm/components/Header';
import Footer from '@/app/sslm/components/Footer';
import '@/app/globals.css';
import {auth} from "@/auth";
import {Session} from "next-auth";
import SideBar from "@/app/components/SideBar";
import React from "react";

export const metadata: Metadata = {
    title: 'SSLM(SSL Management)',
    description: '인증서 관리 시스템',
};

export default async function DomainLayout({children}: { children: React.ReactNode }) {

    const session = await auth();
    return (
        <div className="flex flex-col min-h-screen h-full">
            <Header session={session as Session}/>
            <div className="flex w-full h-full">
                <SideBar build={1} session={session as Session}/>
                <div className={"p-6 size-full "}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
}