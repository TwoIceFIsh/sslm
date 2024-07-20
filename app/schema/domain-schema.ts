import {z} from 'zod';


/**
 * zod의 DomainSchema 통해 유효성 검사를 진행합니다.
 * */
export const DomainSchema = z.object({

    dName: z.string().min(1, {
        message: '도메인 이름은 최소 1자 이상이어야 합니다',
    }),
    dType: z.string().min(1, {
        message: '도메인 유형을 선택해 주세요',
    }),
    dOwner: z.string().min(1, {
        message: '소유자를 입력해 주세요',
    }),
    dEmail: z.string().email({
        message: '올바른 이메일 주소가 아닙니다',
    }),
    dDate: z.date(),
    dId: z.optional(z.number())
});