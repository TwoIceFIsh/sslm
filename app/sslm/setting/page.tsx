'use client';
import React, { useEffect, useState } from 'react';
import { Setting } from '@/app/types/Setting';
import getSetting from '@/app/actinos/get-setting';
import saveSetting from '@/app/actinos/post-setting';
import PageStatement from '@/app/sslm/components/PageStatement';
import { toast } from 'react-hot-toast';

const Page = () => {
    const [setting, setSetting] = useState<Setting>({
        sEmail: '',
        sId: 0,
        sPassword: '',
        sServer: '',
        sPort: '',
        sToken: '',
        sTarget: '',
        sTargetName: '',
        sSsl: true,
    });
    const checkEmail = () => {
        if (!setting.sEmail.includes('@')) {
            toast.error('이메일 주소를 입력해 주세요');
            return false;
        } else {
            return true;
        }
    };

    const checkSmtp = () => {
        if (!setting.sServer.includes('.')) {
            toast.error('SMTP 서버를 입력해 주세요');
            return false;
        } else {
            return true;
        }
    };

    const testMail = async () => {
        if (checkEmail() && checkSmtp()) {
            try {
                const response = await fetch(`/api/sslm/email/0/0`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.result) toast.success('테스트 발송 성공');
                    else toast.error('테스트 발송 실패(설정 수정)');
                }
            } catch (error) {
                toast.error('테스트 발송 실패');
            }
        }
    };
    const callSetting = async () => {
        setSetting((await getSetting()) as Setting);
    };

    const callSettingSave = async () => {
        if (checkEmail() && checkSmtp()) {
            await saveSetting(setting);
        }
    };

    const handleCheckboxChange = (event: any) => {
        setSetting({ ...setting, sSsl: event.target.checked });
    };

    useEffect(() => {
        callSetting().then((r) => null);
    }, []); // 빈 배열을 전달하여 한 번만 실행하도록 설정

    return (
        <div className={'flex  w-full flex-col gap-2 p-4'}>
            <div>
                <PageStatement
                    header={'이메일 발송 정보'}
                    context={'이메일 발송 계정을 설정하고 테스트를 할 수 있습니다.'}
                />
                <div className={'flex gap-2'}>
                    <div className={'flex-grow'}>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                            이메일 주소
                        </label>
                        <input
                            type="text"
                            id="email"
                            defaultValue={setting?.sEmail}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            placeholder="test@test.com"
                            onChange={(e) => setSetting({ ...setting, sEmail: e.target.value })}
                        />
                    </div>

                    <div className={'flex-grow'}>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                            이메일 비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            defaultValue={setting?.sPassword}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            placeholder="*****"
                            onChange={(e) => setSetting({ ...setting, sPassword: e.target.value })}
                        />
                    </div>
                </div>
                <div className={'flex gap-2'}>
                    <div className={'flex-grow'}>
                        <label
                            htmlFor="smtp"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                            발신서버(SMTP) 주소
                        </label>
                        <input
                            type="text"
                            id="smtp"
                            defaultValue={setting?.sServer}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            placeholder="smtp.dooray.com"
                            onChange={(e) => setSetting({ ...setting, sServer: e.target.value })}
                        />
                    </div>
                    <div className={'flex-grow'}>
                        <label
                            htmlFor="port"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                            발신서버(SMTP) 포트
                        </label>
                        <input
                            type="text"
                            id="port"
                            defaultValue={setting?.sPort}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            placeholder="465"
                            onChange={(e) => setSetting({ ...setting, sPort: e.target.value })}
                        />
                    </div>
                </div>
                <label>
                    <input
                        type="checkbox"
                        checked={setting?.sSsl}
                        onChange={handleCheckboxChange}
                    />
                    <span className="mb-4 text-xs font-bold"> SSL</span>
                </label>
                <div className={'flex gap-2'}>
                    <button
                        className={'w-20 rounded-md bg-blue-400 p-2 text-xs text-white'}
                        onClick={callSettingSave}
                    >
                        저장
                    </button>
                    <button
                        className={'w-20 rounded-md bg-green-500 p-2 text-xs text-white'}
                        onClick={testMail}
                    >
                        테스트
                    </button>
                </div>
            </div>
            <div className={'p-4'}></div>
            <div className={'flex gap-2'}>
                <div className={'flex flex-1 flex-col'}>
                    <div className={'flex flex-1'}>
                        <PageStatement
                            header={'Dooray API Token 등록'}
                            context={
                                '이름 검색 및 메시지를 보내기 위하여 Dooray API Token 정보를 입력해 주세요.'
                            }
                        />
                    </div>
                    <div className={'flex flex-col'}>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                            Dooray API Token
                        </label>
                        <input
                            type="password"
                            id="token"
                            defaultValue={setting?.sToken}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            placeholder="jp3kgvh14yt0:tpnLpHxERB-RQkYYzGif6A"
                            onChange={(e) => setSetting({ ...setting, sToken: e.target.value })}
                        />
                        <button
                            className={'mt-2 w-20 rounded-md bg-blue-400 p-2 text-xs text-white'}
                            onClick={callSettingSave}
                        >
                            저장
                        </button>
                    </div>
                </div>
                <div className={'flex flex-1'}></div>
            </div>
        </div>
    );
};

export default Page;
