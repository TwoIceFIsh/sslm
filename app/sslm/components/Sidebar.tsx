import React from 'react';
import SidebarText from '@/app/sslm/components/SidebarComponent/SidebarText';

const asdf = [
    { url: '/sslm/#', text: '[사용자 메뉴]' },
    { url: '/sslm', text: '🏠 홈' },
    { url: '/sslm/domain', text: '✉️ 도메인/연락 관리' },
    { url: '/sslm/domain2', text: '📖 백데이터 관리' },
    { url: '/sslm/template/list', text: '📜 양식 관리' },
    { url: '/sslm/##', text: '' },
    { url: '/sslm/###', text: '[관리자 메뉴]' },
    { url: '/sslm/log', text: '👁️‍ 로그조회' },
    { url: '/sslm/user', text: '😊 회원관리' },
    { url: '/sslm/setting', text: '🛠️ 환경 설정' },
];

const Sidebar = () => {
    return (
        <div className={' flex w-60 flex-col gap-2 border-r-2 p-2'}>
            {asdf.map((data, index) => (
                <SidebarText key={index} url={data.url} text={data.text} />
            ))}
        </div>
    );
};

export default Sidebar;
