import { Search } from '@/app/types/Search';

async function getUserName(name: string) {
    try {
        if (name.includes('(')) name = name.split('(')[1].split(')')[0];
        const response = await fetch(`/api/dooray/search/${name}`);
        if (response.ok) {
            const data: Search = await response.json();
            if (data != null) {
                return data;
            }
        } else {
        }
    } catch (error) {}
}

export default getUserName;
