'use client';
import React, {useEffect, useState} from 'react';
import RadioButton from '@/app/sslm/components/MyRadio';
import {toast} from 'sonner';
import {useRouter} from "next/navigation";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {fetchTemplate} from "@/app/sslm/template/edit/[tId]/actions/fetch-template";
import {saveTemplate} from "@/app/sslm/template/edit/[tId]/actions/save-template";

// (중략...)

export interface Template {
    tId: number;
    tTitle: string
    tContext: string
    tType: string
    tDate: Date
}

const TemplatePage = ({params}: { params: { tId: string } }) => {
    const [template, setTemplate] = useState<Template>(
        {
            tId: 0,
            tTitle: '',
            tContext: '',
            tType: '',
            tDate: new Date(),
        }
    );
    const [context, setContext] = useState<string>()

    useEffect(() => {
        // 편집 모드일 경우 템플릿 데이터 불러오기
        const getTemplate = async () => {
            const template = await fetchTemplate(params.tId);
            setTemplate(template as Template);
        }
        getTemplate().then();
    }, [params.tId]);

    const router = useRouter()
    const onSubmit = async () => {
        try {
            const dataToSave = {
                tTitle: template?.tTitle,
                tType: template?.tType,
                tContext: context as string,
                tId: template?.tId,
            };

            const response = await saveTemplate(params.tId, dataToSave);

            if (response.success) {
                toast.success('저장 성공');
                router.push('/sslm/template/list');
                router.refresh()
                return;
            } else {
                toast.error('저장 실패');
            }
        } catch (error) {
            toast.error('저장 실패');
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemplate({...template, tType: e.target.value});
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
                        value={template?.tTitle}
                        onChange={(e) => setTemplate({...template, tTitle: e.target.value})}
                        className="rounded-md border-2 px-3"
                    />

                    <div></div>
                    <label className={'mx-2 text-xs font-bold'}>{'유형'}</label>
                    <form className={'flex w-full gap-4'}>
                        <RadioButton
                            label="[이메일]"
                            value="이메일"
                            checked={template?.tType === '이메일'}
                            onChange={handleTypeChange}
                        />
                        <RadioButton
                            label=" [메시지]"
                            value="메시지"
                            checked={template?.tType === '메시지'}
                            onChange={handleTypeChange}
                        />
                    </form>
                    <div></div>
                    <label className={'mx-2 text-xs font-bold'}>{'키워드'}</label>
                    <div>
                        !dOwner - 담당자 !dEmail - 이메일 !dName - 도메인 !dType - 유형 !dDate -
                        만료일자
                    </div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={template?.tContext}
                        onChange={(event, editor) => {
                            setContext(editor.getData());
                        }}
                    />
                    <div className="flex h-10 gap-2">
                        <button
                            className="col-1 w-20 rounded-md bg-blue-600 text-white"
                            onClick={onSubmit}
                        >
                            저장
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="col-1 w-20 rounded-md bg-blue-600 text-white">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatePage;