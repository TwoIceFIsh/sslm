import React from 'react';
import getInitMain from '@/app/actinos/init-main';

const Footer = () => {
    return <div className={'my-4 text-center'}>{getInitMain('VERSION')}</div>;
};

export default Footer;
