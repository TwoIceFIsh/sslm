import React from 'react';
import SidebarText from '@/app/sslm/components/SidebarComponent/SidebarText';

const asdf = [
    {url: '/sslm/#', text: '[사용자 메뉴]'},
    {url: '/sslm', text: '🏠 홈'},
    {url: '/sslm/domain', text: '📨 연락'},
    {url: '/sslm/domain-new', text: '🌏 도메인 관리'},
    {url: '/sslm/domain2', text: '📖 백데이터 관리'},
    {url: '/sslm/template/list', text: '📜 양식 관리'},
    {url: '/sslm/setting', text: '🛠️ 나의 설정'},
    {url: '/sslm/##', text: ''},
    {url: '/sslm/###', text: '[관리자 메뉴]'},
    {url: '/sslm/log', text: '👁️‍ 로그조회'},
    {url: '/sslm/user', text: '😊 회원관리'},

];

const Sidebar = () => {
    return (
        <div className={'shrink-0 flex w-60 flex-col gap-2 p-2'}>
            {asdf.map((data, index) => (
                <SidebarText className={"select-none"} key={index} url={data.url} text={data.text}/>
            ))}
        </div>
    );
};

export default Sidebar;