export default function int2Date(excelDateInt: number) {
    // Excel의 날짜 기준일 (1900년 1월 1일)
    const excelBaseDate = new Date('1900-01-01');

    // 날짜 계산 및 변환
    return new Date(excelBaseDate.getTime() + (excelDateInt - 1) * 24 * 60 * 60 * 1000);
}
