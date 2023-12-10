import Image from 'next/image';
import React from 'react';
import getInitMain from '@/app/actinos/init-main';

export default function Home() {
    return (
        <div className={'flex w-full flex-col items-center text-center'}>
            <Image
                src={getInitMain('LOGO_FILE') as string}
                width={400}
                height={400}
                alt={'logo'}
                priority={true}
            />
            <div className={'text-2xl'}>{getInitMain('COMMENT1')}</div>
            <div className={'mb-5 w-full'}></div>
            <div className={'text-xm'}>{getInitMain('COMMENT2')}</div>
            <div className={'text-xm'}>{getInitMain('COMMENT3')}</div>
        </div>
    );
}
