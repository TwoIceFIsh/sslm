'use client';
import React, { useState } from 'react';
import getInitMain from '@/app/actinos/init-main';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaAddressBook } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Header = () => {
    const { data: session, status } = useSession();
    const [User, setUser] = useState<boolean>(false);

    const callSignOut = async () => {
        toast.success('로그아웃');
        await signOut({ callbackUrl: '/api/auth/signin' });
    };
    return (
        <div className={'flex items-center justify-between gap-2 p-4'}>
            <div className={'w-48  rounded-md border-2 p-1 text-center font-bold'}>
                <Link href={'/'}>SSLM {getInitMain('VERSION')}🔐</Link>
            </div>
            <div className={'w-48  text-center'}></div>
            <div className={'flex items-center gap-2  p-1'}>
                <div
                    className={'flex cursor-pointer items-center gap-2 rounded-md border p-1'}
                    onClick={() => null}
                >
                    <div>
                        <FaAddressBook />
                    </div>
                    <div className={'flex-grow cursor-pointer select-none flex-col text-end'}>
                        {session?.user?.name}님
                    </div>
                </div>
                <button
                    onClick={() => callSignOut()}
                    className={'w-24 rounded-md border  bg-black text-center text-white'}
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Header;
