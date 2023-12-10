'use client';
import React, { useEffect, useState } from 'react';
import { Domain } from '@/app/types/Domain';
import { Template } from '@/app/types/Template';
import getUserName from '@/app/actinos/dooray-search-name';
import deleteDomain from '@/app/actinos/delete-domain';
import saveDomain from '@/app/actinos/post-domain';
import getTemplate from '@/app/actinos/get-domain';
import updateDomain from '@/app/actinos/update-domain';
import getInitMain from '@/app/actinos/init-main';
import * as XLSX from 'xlsx';
import PageStatement from '@/app/sslm/components/PageStatement';
import RadioButton from '@/app/sslm/components/MyRadio';
import { toast } from 'react-hot-toast';

const Page = () => {
    const initialDomainState = {
        dEmail: '',
        dType: '',
        dName: '',
        dOwner: '',
        dId: 1,
        dDate: '',
        dFilePath: '',
    };

    const [domainData, setDomainData] = useState<Domain[] | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showContactModal, setShowContactModal] = useState<boolean>(false);
    const [editFlag, setEditFlag] = useState(false);
    const [templateDTOs, setTemplateDTOs] = useState<Template[]>();
    const [selected, setSelected] = useState('1');
    const [action, setAction] = useState<string>();
    const [domain, setDomain] = useState<Domain>(initialDomainState);

    const toggleModal = () => {
        setDomain(initialDomainState);
        setShowModal((prevShowModal) => !prevShowModal);
        setEditFlag(false);
    };
    const getDomain = async () => {
        try {
            const response = await fetch(`/api/domain`);
            if (response.ok) {
                const data = await response.json();
                setDomainData(data);
            } else {
                // 에러 처리
            }
        } catch (error) {
            // 에러 처리
        }
    };
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (domain.dOwner != null) {
                const data = await getUserName(domain.dOwner);
                if (data != undefined) {
                    setDomain({
                        ...domain,
                        dOwner: data.name,
                        dEmail: data.userCode + `@${getInitMain('EMAIL_DOMAIN')}`,
                    });
                }
            }
        } else {
        }
    };

    const callDeleteDomain = async (id: number) => {
        if (await deleteDomain(String(id))) getDomain();
    };

    const saveToDatabase = async () => {
        if (editFlag) {
            await updateDomain(domain);
            toast.success('도메인 수정 성공');
        } else {
            await saveDomain(domain);
            toast.success('도메인 저장 성공');
        }
        await getDomain();
        toggleModal();
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    const sendAction = async (dId: string, tId: string) => {
        if (tId == '') {
            toast.error('양식을 선택해 주세요');
            return;
        }
        const result = await fetch(`/api/template/${String(tId)}`);
        const data: Template = await result.json();

        if (data.tType === '이메일') {
            const result = await fetch(`/api/email/${dId}/${String(tId)}`);
            if (result.ok) {
                const message = await result.json();
                if (message.result == true) {
                    toast.success('이메일 발송 성공');
                    toggleModal2();
                } else {
                    toast.error('이메일 발송 실패');
                }
            } else {
                toast.error('서버 에러');
            }
        } else {
            const result = await fetch(`/api/dooray/message/${dId}/${tId}`);
            if (result.ok) {
                const messege = await result.json();
                if (messege.result == true) {
                    toast.success('메시지 발송 성공');
                    toggleModal2();
                } else {
                    toast.error('메시지 발송 실패');
                }
            } else {
                toast.error('서버 에러');
            }
        }
    };

    const toggleModal2 = () => {
        setShowContactModal(!showContactModal);
    };

    const editDomain = async (dId: number) => {
        const data = await getTemplate(dId);
        setDomain(data as Domain);
        setEditFlag(true);
        setShowModal(!showModal);
    };

    const downloadExcel = (data: []) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet');
        XLSX.writeFile(workbook, 'result_domain.xlsx');
    };

    const downloadXlsx = async () => {
        const result = await fetch(`/api/domain`);
        const response = await result.json();
        if (result.ok && response.length > 0) {
            downloadExcel(response);
            toast.success('다운로드 성공');
        } else {
            toast.error('다운로드 실패');
        }
    };

    const contactDomain = async (data: Domain, actionFlag: string) => {
        if (actionFlag === '주문') setAction('주문');
        else setAction('연락');

        setShowContactModal(!showContactModal);
        setDomain(data);
        const result = await fetch(`/api/template`);
        const output = await result.json();
        setTemplateDTOs(output);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDomain({ ...domain, dType: e.target.value });
    };

    useEffect(() => {
        getDomain().then((r) => null);
    }, []); // Call getDomain on component mount

    return (
        <div className={'w-full p-4'}>
            <PageStatement
                header={'도메인 관리'}
                context={'도메인 현황을 관리하고 메일 또는 메시지를 발송할 수 있습니다.'}
            />
            <div className={'mb-2 flex w-full content-center justify-between gap-2 '}>
                <div className={'flex gap-2 '}>
                    <div
                        className={
                            'mt-0.5 cursor-pointer select-none rounded border-amber-200 bg-green-500 p-1 text-xs font-bold text-white'
                        }
                        onClick={downloadXlsx}
                    >
                        데이터 다운로드
                    </div>
                </div>
                <div className={'flex gap-2'}>
                    <button
                        className={
                            'mt-0.5 rounded border-amber-200 bg-green-500 p-1 text-xs font-bold text-white'
                        }
                        onClick={toggleModal}
                    >
                        등록/추가
                    </button>
                </div>
            </div>

            {showContactModal && (
                <div
                    className={
                        ' fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
                    }
                >
                    <div
                        className={
                            'flex flex-col items-center justify-center gap-4 bg-gray-100 p-4'
                        }
                    >
                        <div className={'mb-2'}></div>
                        <div className={'flex w-full items-center justify-around gap-2 text-xs'}>
                            <div className={'mx-3 w-32 text-center font-bold'}>양식</div>
                            <select onChange={handleSelect} defaultValue={selected}>
                                <option>양식을 선택해 주세요!</option>
                                {templateDTOs?.map((template) => (
                                    <option key={template.tId} value={template.tId}>
                                        [{template.tType}] {template.tTitle}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div
                            className={
                                'flex w-full items-center justify-around gap-2 text-center text-xs'
                            }
                        >
                            {domain?.dOwner}({domain?.dEmail})에게 이메일 또는 메시지를 발송합니다.
                        </div>

                        <div className={'flex w-full '}>
                            <button
                                className="flex-grow  bg-green-400 p-2 text-xs font-bold"
                                onClick={() => sendAction(String(domain.dId), selected)}
                            >
                                발송
                            </button>
                            <button
                                className="flex-grow  bg-red-400 p-2 text-xs font-bold"
                                onClick={toggleModal2}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div
                    className={
                        ' fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
                    }
                >
                    <div
                        className={
                            'flex w-96 flex-col items-center justify-center gap-4 bg-gray-100'
                        }
                    >
                        <div className={'mb-2'}></div>
                        <div className={'flex w-full items-center justify-around gap-2 text-xs'}>
                            <div className={'mx-3 w-32 text-center font-bold'}>도메인</div>
                            <input
                                className={'mx-3 w-full rounded-md border-4'}
                                defaultValue={domain.dName}
                                onChange={(e) => setDomain({ ...domain, dName: e.target.value })}
                            />
                        </div>

                        <div className={'flex w-full items-center justify-around gap-2 text-xs'}>
                            <div className={'mx-3 w-32 text-center font-bold'}>유형</div>
                            <form className={'flex w-full justify-around gap-4'}>
                                <RadioButton
                                    label="[1년]"
                                    value="1년"
                                    checked={domain.dType === '1년'}
                                    onChange={handleTypeChange}
                                />
                                <RadioButton
                                    label="[2년]"
                                    value="2년"
                                    checked={domain.dType === '2년'}
                                    onChange={handleTypeChange}
                                />
                            </form>
                        </div>

                        <div className={'flex w-full items-center justify-around gap-2 text-xs'}>
                            <div className={'mx-3 w-32 text-center font-bold'}>
                                담당자
                                <br />
                                (검색&엔터)
                            </div>
                            <input
                                className={'mx-3 w-full rounded-md border-4'}
                                value={domain.dOwner}
                                onChange={(e) => setDomain({ ...domain, dOwner: e.target.value })}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                        <div className={'flex w-full items-center justify-around gap-2 text-xs'}>
                            <div className={'mx-3 w-32 text-center font-bold'}>
                                이메일
                                <br />
                                (자동 완성)
                            </div>
                            <input
                                className={
                                    'mx-3 w-full cursor-not-allowed rounded-md border-4 bg-gray-200'
                                }
                                value={domain.dEmail}
                                type={'text'}
                                onChange={(e) => setDomain({ ...domain, dEmail: e.target.value })}
                            />
                        </div>

                        <div className={'flex w-full items-center justify-around gap-2 text-xs'}>
                            <div className={'mx-3 w-32 text-center font-bold'}>이용 만료일</div>
                            <input
                                className={'mx-3 w-full rounded-md  border-4'}
                                defaultValue={domain.dDate}
                                type={'date'}
                                onChange={(e) => setDomain({ ...domain, dDate: e.target.value })}
                            />
                        </div>
                        <div className={'flex w-full '}>
                            <button
                                className="flex-grow  bg-green-400 p-2 text-xs font-bold"
                                onClick={saveToDatabase}
                            >
                                저장
                            </button>
                            <button
                                className="flex-grow  bg-red-400 p-2 text-xs font-bold"
                                onClick={toggleModal}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full table-auto text-left text-sm text-gray-500">
                    <thead className="bg-gray-700 text-center text-xs text-white">
                        <tr>
                            <th className="min-w-16 px-4 py-2">번호</th>
                            <th className="min-w-16 px-4 py-2">유형</th>
                            <th className="min-w-32 px-4 py-2">도메인</th>
                            <th className="min-w-32 px-4 py-2">소유자</th>
                            <th className="min-w-32 px-4 py-2">이메일</th>
                            <th className="min-w-20 px-4 py-2">이용 만료일</th>
                            <th className="min-w-32 px-4 py-2">작업</th>
                        </tr>
                    </thead>

                    <tbody>
                        {domainData?.map((domain) => (
                            <tr
                                key={domain.dId}
                                className="border-b bg-white text-center text-black hover:bg-gray-300"
                            >
                                <td className="whitespace-nowrap px-4 py-2">{domain.dId}</td>
                                <td className="whitespace-nowrap px-4 py-2">{domain.dType}</td>
                                <td className="whitespace-nowrap px-4 py-2">{domain.dName}</td>
                                <td className="whitespace-nowrap px-4 py-2">{domain.dOwner}</td>
                                <td className="whitespace-nowrap px-4 py-2">{domain.dEmail}</td>
                                <td className="whitespace-nowrap px-4 py-2">{domain.dDate}</td>
                                <td className={'flex  gap-2 p-2 text-xs font-bold text-white'}>
                                    <button
                                        className={'w-full rounded border-amber-200 bg-cyan-400'}
                                        onClick={() => contactDomain(domain, '연락')}
                                    >
                                        연락
                                    </button>
                                    <button
                                        className={' w-full rounded border-amber-200 bg-yellow-400'}
                                        onClick={() => editDomain(Number(domain.dId))}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className={'border-domain-200 w-full rounded bg-red-400'}
                                        onClick={() => callDeleteDomain(Number(domain.dId))}
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
