import { Template } from '@/app/types/Template';

async function getTemplateMany() {
    try {
        const response = await fetch(`/api/template`);
        if (response.ok) {
            const data: Template[] = await response.json();
            if (data != null) {
                return data;
            }
        } else {
        }
    } catch (error) {}
}

export default getTemplateMany;
