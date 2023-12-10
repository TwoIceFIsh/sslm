import { Template } from '@/app/types/Template';

const saveTemplate = async (domain: Template) => {
    try {
        // 가정: 실제로는 이 부분에서 데이터를 서버 또는 데이터베이스에 저장하는 API 호출을 수행해야 합니다.
        const response = await fetch(`/api/sslm/template`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(domain),
        });

        if (!response.ok) {
            console.error('Failed to save data to the database.');
        }

        return await response.json();
    } catch (error) {
        console.error('GlobalError saving data to the database:', error);
        // 에러 처리 로직을 추가할 수 있습니다.
    }
};

export default saveTemplate;
