import {Template} from '@/app/types/Template';

async function getTemplateOne(tId: string) {
    try {
        const response = await fetch(`/api/sslm/template/${tId}`);

        if (response.ok) {
            const data: Template = await response.json();
            if (data != null) {
                return data;
            }
        } else {
        }
    } catch (error) {
    }
}

export default getTemplateOne;