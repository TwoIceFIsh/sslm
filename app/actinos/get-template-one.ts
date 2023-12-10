import { Template } from '@/app/types/Template';

async function getTemplateOne(tId: string) {
    try {
        const response = await fetch(`/api/template/${tId}`);

        if (response.ok) {
            const data: Template = await response.json();
            console.log(data);
            if (data != null) {
                return data;
            }
        } else {
        }
    } catch (error) {}
}

export default getTemplateOne;
