'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { Template } from '@/app/types/Template';
import PageStatement from '@/app/sslm/components/PageStatement';
import getTemplateMany from '@/app/actinos/get-template-many';
import deleteTemplateOne from '@/app/actinos/delete-template-one';

const Page = () => {
    const [templateData, setTemplateData] = useState<Template[] | null>(null);

    const getTemplate = async () => {
        const data = await getTemplateMany();
        setTemplateData(data as Template[]);
    };

    const deleteTemplateAction = async (id: number) => {
        await deleteTemplateOne(id);
        await getTemplate();
    };

    useEffect(() => {
        getTemplate().then(() => null);
    }, [templateData]);

    return (
        <div className={'w-full  p-4'}>
            <PageStatement
                header={'이메일/메시지 양식 관리'}
                context={'이메일 및 메시지 양식을 관리할 수 있습니다.'}
            />
            <div className={'mb-2 flex w-full justify-between'}>
                <div></div>
                <button
                    className={
                        'mt-0.5 rounded border-amber-200 bg-blue-500 p-1 text-xs font-bold text-white'
                    }
                >
                    <Link href={'/sslm/template/edit/new'}>등록/추가</Link>
                </button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 ">
                    <thead className="cursor-default bg-gray-700  text-center text-xs text-white">
                        <tr>
                            <th>번호</th>
                            <th>유형</th>
                            <th>제목</th>
                            <th>등록일</th>
                            <th>작업</th>
                        </tr>
                    </thead>

                    <tbody>
                        {templateData?.map((template) => (
                            <tr
                                className="cursor-default border-b bg-white text-center text-black hover:bg-gray-300"
                                key={template.tId}
                            >
                                <td>{template.tId}</td>
                                <td>{template.tType}</td>
                                <td>{template.tTitle}</td>
                                <td>{template.tDate}</td>
                                <td className={'flex content-center gap-2 text-xs font-bold'}>
                                    <Link
                                        className={
                                            'mt-0.5 w-full rounded border-amber-200 bg-yellow-300'
                                        }
                                        href={`/sslm/template/edit/${template.tId}`}
                                    >
                                        수정
                                    </Link>
                                    <button
                                        className={
                                            'mt-0.5 w-full rounded border-amber-200 bg-red-400'
                                        }
                                        onClick={() => deleteTemplateAction(template.tId)}
                                    >
                                        삭제
                                    </button>
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
