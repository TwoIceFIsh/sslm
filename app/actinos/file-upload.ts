import { NextResponse } from 'next/server';

const fileUpload = async (file: Blob) => {
    const formData = new FormData();
    formData.append('file', file, file.name); // 파일 이름을 명시

    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        return NextResponse.json({ result: true });
    } catch (error) {
        console.error('파일 업로드 중 오류:', error);
    }
};

export default fileUpload;
