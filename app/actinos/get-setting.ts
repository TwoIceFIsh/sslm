import { Setting } from '@/app/types/Setting';

async function getSetting() {
    try {
        const response = await fetch(`/api/sslm/setting`);
        if (response.ok) {
            const data: Setting = await response.json();
            return data;
        } else {
        }
    } catch (error) {}
}

export default getSetting;
