import { Setting } from '@/app/types/Setting';
import { toast } from 'react-hot-toast';

async function saveSetting(data: Setting) {
    if (data.sSsl === undefined) data.sSsl = true;

    try {
        const response = await fetch(`/api/setting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success('저장이 완료 되었습니다.');
        } else {
            toast.error('DB 에러');
        }
    } catch (error) {
        toast.error('서버 에러');
    }
}

export default saveSetting;
