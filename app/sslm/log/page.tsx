'use client';
import React, { useEffect, useState } from 'react';
import PageStatement from '@/app/sslm/components/PageStatement';
import { Log } from '@/app/types/Log';

const Page = () => {
    const [logs, setLogs] = useState<Log[]>();

    const callLogs = async () => {
        const data = await fetch('/api/sslm/log');
        setLogs(await data.json());
    };
    useEffect(() => {
        callLogs();
    }, []); // 빈 배열을 전달하여 한 번만 실행하도록 설정

    return (
        <div className={'w-full  select-none p-4'}>
            <PageStatement
                header={'로그 조회'}
                context={'최근 20개의 사용자의 행위를 확인할 수 있습니다.'}
            />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 ">
                    <thead className="cursor-default bg-gray-700  text-center text-xs text-white">
                        <tr>
                            <th>번호</th>
                            <th>일자</th>
                            <th>내용</th>
                            <th>사용자</th>
                        </tr>
                    </thead>

                    <tbody>
                        {logs?.map((log, index) => (
                            <tr
                                className={`cursor-default border-b text-center hover:cursor-pointer ${
                                    index === 0
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-black hover:bg-gray-300'
                                }`}
                                key={log.lId}
                            >
                                <td>{log.lId}</td>

                                <td>{log.lDate}</td>
                                <td>{log.lText}</td>
                                <td>{log?.lUser ? log.lUser : 'User'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
