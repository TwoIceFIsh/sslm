import React from 'react';
import fileUpload from '@/app/actinos/file-upload';

const FileModal = () => {
    const handleChangeFile = (e: any) => {
        const [file] = [...e.target.files];
        fileUpload(file).then(async (r) => {
            if (r != undefined) {
                window.location.reload();
            } else {
                alert('파일 업로드 실패!');
            }
        });
    };

    return (
        <div>
            <input
                className={
                    'mt-0.5 rounded border-amber-200 bg-blue-500 p-1 text-xs font-bold text-white'
                }
                type="file"
                accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleChangeFile}
            />
        </div>
    );
};

export default FileModal;
