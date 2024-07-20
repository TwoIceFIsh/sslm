'use client';
import React from 'react';
import getInitMain from '@/app/actinos/init-main';
import Link from 'next/link';
import {toast} from 'sonner';
import {LogOutIcon} from "lucide-react";
import {Session} from "next-auth";
import {Button} from "@/components/ui/button";
import {signOutBasic} from "@/lib/sign-out";

interface HeaderProps {
    session: Session

}

const Header = ({session}: HeaderProps) => {
    const callSignOut = async () => {
        toast.success('로그아웃');
        await signOutBasic()
    };
    return (
        <div className={'flex items-center justify-between gap-2 p-4'}>
            <div className={'w-48 rounded-md border-2 p-1 text-center font-bold'}>
                <Link href={'/sslm'}>SSLM {getInitMain('VERSION')}🔐</Link>
            </div>
            <div className={'w-48 text-center'}></div>
            <div className={'flex items-center gap-2 p-1'}>
                {session.user.name}님
                <Button
                    className={"w-6 h-6"}
                    onClick={() => callSignOut()}
                    size={"icon"}
                >
                    <LogOutIcon/>
                </Button>
            </div>
        </div>
    );
};

export default Header;