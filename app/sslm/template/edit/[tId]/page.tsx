'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import getTemplateOne from '@/app/actinos/get-template-one';
import { Template } from '@/app/types/Template';
import RadioButton from '@/app/sslm/components/MyRadio';
import { toast } from 'react-hot-toast';
// (중략...)

const TemplatePage = ({ params }: { params: { tId: string } }) => {
    const [tId] = useState<string>(params.tId || 'new');
    const [template, setTemplate] = useState<Template>({
        tTitle: '',
        tId: Number(params.tId),
        tType: '이메일',
        tDate: '',
        tContext: '',
    });

    useEffect(() => {
        if (tId !== 'new') {
            // 편집 모드일 경우 템플릿 데이터 불러오기
            callGetTemplate(tId);
        }
    }, [tId]);

    const callGetTemplate = async (templateId: string) => {
        const data = await getTemplateOne(templateId);
        if (data !== undefined) {
            setTemplate({
                ...data,
                tTitle: data.tTitle,
                tContext: data.tContext,
                tType: data.tType,
            });
        }
    };

    const saveTemplate = async () => {
        const isNewTemplate = tId === 'new';

        try {
            const today = new Date();
            const dataToSave = {
                tTitle: template.tTitle,
                tType: template.tType,
                tContext: template.tContext,
                tDate: today.toLocaleDateString(),
            };

            const url = isNewTemplate ? `/api/sslm/template` : `/api/sslm/template/${tId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });

            if (response.ok) {
                toast.success('저장 성공');
                return;
            } else {
                toast.error('저장 실패');
            }
        } catch (error) {
            toast.error('저장 실패');
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemplate({ ...template, tType: e.target.value });
    };
    return (
        <div className="w-full p-4">
            <div className="flex h-full justify-evenly gap-2">
                <div className="bg-gray-50-400 flex w-full flex-col gap-2">
                    <label className="mx-2 text-xs font-bold" htmlFor="s_title">
                        제목
                    </label>
                    <input
                        id="s_title"
                        placeholder="제목을 입력해 주세요"
                        type="text"
                        value={template.tTitle}
                        onChange={(e) => setTemplate({ ...template, tTitle: e.target.value })}
                        className="rounded-md border-2 px-3"
                    />

                    <div></div>
                    <label className={'mx-2 text-xs font-bold'}>{'유형'}</label>
                    <form className={'flex w-full gap-4 '}>
                        <RadioButton
                            label="[이메일]"
                            value="이메일"
                            checked={template.tType === '이메일'}
                            onChange={handleTypeChange}
                        />
                        <RadioButton
                            label=" [메시지]"
                            value="메시지"
                            checked={template.tType === '메시지'}
                            onChange={handleTypeChange}
                        />
                    </form>
                    <div></div>
                    <label className={'mx-2 text-xs font-bold '}>{'키워드'}</label>
                    <div>
                        !dOwner - 담당자 !dEmail - 이메일 !dName - 도메인 !dType - 유형 !dDate -
                        만료일자
                    </div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={template.tContext}
                        onChange={(event, editor) => {
                            template.tContext = editor.getData();
                        }}
                    />
                    <div className="flex h-10 gap-2">
                        <Link href={'/sslm/template/list'}>
                            <button
                                className="col-1 w-20 rounded-md bg-blue-600 text-white"
                                onClick={saveTemplate}
                            >
                                저장
                            </button>
                        </Link>
                        <Link href={'/sslm/template/list'}>
                            <button className="col-1 w-20 rounded-md bg-blue-600 text-white">
                                취소
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatePage;
