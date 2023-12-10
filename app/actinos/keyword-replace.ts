import { Template } from '@/app/types/Template';
import { Domain } from '@/app/types/Domain';

export function keywordReplace(domain: Domain, template: Template) {
    if (domain.dOwner?.includes('(')) {
        const nameParts = domain.dOwner.split(/\(([^)]+)\)/);
        if (nameParts.length > 1) domain.dOwner = nameParts[1];
    }
    if (template.tTitle != undefined && template.tContext != undefined) {
        template.tTitle = template.tTitle
            .replace(/!dDate/g, domain.dDate as string | '')
            .replace(/!dOwner/g, domain.dOwner as string)
            .replace(/!dName/g, domain.dName as string)
            .replace(/!dType/g, domain.dType as string)
            .replace(/!dEmail/g, domain.dEmail as string);

        template.tContext = template.tContext
            .replace(/!dDate/g, domain.dDate as string | '')
            .replace(/!dOwner/g, domain.dOwner as string)
            .replace(/!dName/g, domain.dName as string)
            .replace(/!dType/g, domain.dType as string)
            .replace(/!dEmail/g, domain.dEmail as string);

        if (template.tType === '메시지') {
            // Replace content inside angle brackets with a single space
            template.tContext = template.tContext.replace(/<([^>]+)>/g, ' ');
        }
    }
    return template;
}
