'use client';
import React, { useEffect, useState } from 'react';
import PageStatement from '@/app/sslm/components/PageStatement';
import User from '@/app/types/User';
import date2StringFormat from '@/app/actinos/date-2-string-format';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const Page = () => {
    const [users, setUsers] = useState<User[]>();

    const callUsers = async () => {
        const data = await fetch('/api/sslm/user');
        setUsers(await data.json());
    };

    const deleteUser = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            const data = await fetch(`/api/sslm/user/delete`, {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                }),
            });
            const result = await data.json();
            if (result.result) toast.success('삭제되었습니다.');
            if (!result.result) toast.error('자기자신은 삭제 할 수 없습니다.');
            await callUsers();
        }
    };

    const changeVarified = async (id: string, email: string, isVarified: boolean) => {
        const data = await fetch('/api/sslm/user', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                email: email,
                isVarified: isVarified,
            }),
        });
        const result = await data.json();
        if (result.result) toast.success('변경되었습니다.');
        if (!result.result) toast.error('자기자신은 변경 할 수 없습니다.');
        await callUsers();
    };

    useEffect(() => {
        callUsers();
    }, []); // 빈 배열을 전달하여 한 번만 실행하도록 설정

    return (
        <div className={'w-full  select-none p-4'}>
            <PageStatement header={'유저 관리'} context={'유저 승인을 관리할 수 있습니다.'} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 ">
                    <thead className="cursor-default bg-gray-700  text-center text-xs text-white">
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>가입일</th>
                            <th>로그인</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user, index) => (
                            <tr
                                className={`cursor-default border-b bg-white text-center text-black hover:bg-gray-300
                                `}
                                key={index}
                            >
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{date2StringFormat(user.created_at)}</td>
                                <td
                                    className={`w-10 cursor-pointer rounded-md border text-sm font-bold text-white
                                        ${user.isVarified ? 'bg-green-500' : 'bg-red-500'}
                                        
                                        `}
                                    onClick={() =>
                                        changeVarified(user.id, user.email, !user.isVarified)
                                    }
                                >
                                    {user.isVarified ? '허용' : '차단'}
                                </td>
                                <td
                                    className={`w-10 cursor-pointer rounded-md border bg-blue-500 text-sm font-bold text-white
                                        
                                        `}
                                >
                                    <Link href={`/sslm/user/edit/${user.id}`}>수정</Link>
                                </td>

                                <td
                                    className={
                                        ' w-10 cursor-pointer rounded-md  border bg-amber-200 text-sm font-bold text-gray-500 '
                                    }
                                    onClick={() => deleteUser(user.id)}
                                >
                                    삭제
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
