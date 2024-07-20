'use client';
import React, {useEffect, useState} from 'react';
import {HeaderData} from '@/app/types/HeaderData';
import headerData from '@/app/types/Domain2Header';
import * as XLSX from 'xlsx';
import int2Date from '@/app/actinos/int-2-date';
import date2StringFormat from '@/app/actinos/date-2-string-format';
import PageStatement from '@/app/sslm/components/PageStatement';
import FileModal from '@/app/sslm/components/FileModal';
import {toast} from 'sonner';

const Page = () => {
    const [domainData, setDomainData] = useState<HeaderData[] | null>(null);
    const [uploadModal, setUploadModal] = useState(false);

    const toggleUploadModal = () => {
        setUploadModal(!uploadModal);
    };

    const downloadExcel = (data: []) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet');
        XLSX.writeFile(workbook, 'result.xlsx');
    };

    const downloadXlsx = async () => {
        const result = await fetch(`/api/sslm/domain2`);
        const response = await result.json();
        if (result.ok && response.length > 0) {
            downloadExcel(response);
            toast.success('데이터 다운 성공');
        } else {
            toast.error('데이터가 없습니다');
        }
    };
    const getDomain2 = async () => {
        try {
            const response = await fetch(`/api/sslm/domain2`);
            if (response.ok) {
                const data = await response.json();
                setDomainData(data);
            } else {
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        getDomain2().then((r) => null);
    }, []); // Call getDomain on component mount

    const deleteDomain = async (dId: string) => {
        if (confirm('데이터를 삭제하시겠습니까?')) {
            const response = await fetch(`/api/sslm/domain2/delete/${dId}`);
            if (response.ok) {
                await getDomain2();
                toast.success('데이터 삭제 성공');
            } else {
                toast.error('데이터 삭제 실패');
            }
        }
    };

    const deleteAll = async () => {
        if (confirm('전체 데이터를 삭제하시겠습니까?')) {
            const response = await fetch(`/api/sslm/domain2/delete/all`, {});
            if (response.ok) {
                await getDomain2();
                toast.success('데이터 전체 삭제 성공');
            } else {
                toast.error('데이터 전체 삭제 실패');
            }
        }
    };

    return (
        <div className={'w-full p-4'}>
            <PageStatement
                header={'📖 백데이터 관리'}
                context={'백데이터 현황을 관리하고 조회할 수 있습니다.'}
            />
            <div className={'mb-2 flex w-full content-center justify-between gap-2'}>
                <div className={'flex gap-2'}>
                    <a
                        className={
                            'mt-0.5 select-none rounded border-amber-200 bg-blue-500 p-1 text-xs font-bold text-white'
                        }
                        href={'/template.xlsx'}
                    >
                        템플릿 다운로드
                    </a>
                    <div
                        className={
                            'mt-0.5 cursor-pointer select-none rounded border-amber-200 bg-red-500 p-1 text-xs font-bold text-white'
                        }
                        onClick={toggleUploadModal}
                    >
                        템플릿 업로드
                    </div>
                    <div
                        className={
                            'mt-0.5 cursor-pointer select-none rounded border-amber-200 bg-green-500 p-1 text-xs font-bold text-white'
                        }
                        onClick={downloadXlsx}
                    >
                        데이터 다운로드
                    </div>
                    {uploadModal && <FileModal/>}
                </div>
                <div className={'flex gap-2'}>
                    <button
                        className={
                            'mt-0.5 cursor-pointer select-none rounded border-amber-200 bg-yellow-500 p-1 text-xs font-bold text-white'
                        }
                        onClick={deleteAll}
                    >
                        전체삭제
                    </button>
                </div>
            </div>

            <div className="shadow-md sm:rounded-lg">
                <table className="w-full border-collapse text-left text-sm text-gray-500">
                    <thead className="bg-gray-700 text-center text-xs text-white">
                    <tr>
                        {headerData.map((data, colIndex) => (
                            <th
                                key={colIndex}
                                className="min-w-32 whitespace-nowrap border border-gray-600 px-4 py-2"
                            >
                                {data}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {domainData?.map((domain, rowIndex) => (
                        <tr
                            className="border-b bg-white text-center text-black hover:bg-gray-300"
                            key={rowIndex}
                        >
                            <td className="border border-gray-600 px-4 py-2">
                                <button
                                    className="border-domain-200 whitespace-nowrap rounded border bg-red-400 p-1"
                                    onClick={() => deleteDomain(String(domain.hId))}
                                >
                                    삭제
                                </button>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hId}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hStatus}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hDomain}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hProject}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hType}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hCustomer}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hRenew}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hContract}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>
                                    {date2StringFormat(int2Date(domain.hIssue))}
                                </div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>
                                    {date2StringFormat(int2Date(domain.hExpire))}
                                </div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>
                                    {date2StringFormat(int2Date(domain.hContractExpire))}
                                </div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hCost}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hBuyer}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hManager}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hActor}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hPurpose}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hWebType}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hWebServer}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hDomainServerIp}</div>
                            </td>
                            <td className="border border-gray-600 px-4 py-2">
                                <div className={'truncate'}>{domain.hMemo}</div>
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