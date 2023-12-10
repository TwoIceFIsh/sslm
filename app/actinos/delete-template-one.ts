import { toast } from 'react-hot-toast';

const deleteTemplateOne = async (tId: number) => {
    if (confirm('정말로 삭제 할까요?')) {
        try {
            const response = await fetch(`/api/sslm/template/${tId}/delete`);
            toast.success('삭제가 완료 되었습니다.');
            return response.ok;
        } catch (error) {
            toast.error('삭제 실패');
            return false;
        }
    }
};

export default deleteTemplateOne;
