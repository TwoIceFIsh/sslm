import {Domain} from '@/app/types/Domain';

async function getTemplate(dId: number) {
    try {
        const response = await fetch(`/api/sslm/domain/${dId}`);
        if (response.ok) {
            const data: Domain = await response.json();
            if (data != null) {
                return data;
            }
        } else {
        }
    } catch (error) {
    }
}

export default getTemplate;