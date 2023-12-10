export interface SearchDTO {
    header: {
        resultCode: number;
        resultMessage: string;
        isSuccessful: boolean;
    };
    result: {
        id: string;
        userCode: string;
        name: string;
        externalEmailAddress: string;
    }[];
    totalCount: number;
}
