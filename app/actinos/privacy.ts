async function makePrivacy(param: string, type: 'email' | 'name') {
    if (type === 'email') {
        const [firstPart, secondPart] = param.split('@');
        if (secondPart) {
            return `${firstPart.slice(0, 2)}**${firstPart.slice(4)}@${secondPart}`;
        }
    } else if (type === 'name') {
        const match = param.match(/\(([^)]+)\)/);
        if (match) {
            if (match[1].length >= 3) {
                const name = match[1];
                return name.charAt(0) + '*' + name.charAt(2);
            }
        } else if (param.length >= 3) {
            return param.charAt(0) + '*' + param.charAt(2);
        } else {
            return param.charAt(0) + '*';
        }
    }

    return param;
}

export default makePrivacy;
