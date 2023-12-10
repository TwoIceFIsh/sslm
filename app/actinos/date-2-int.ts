export default function date2Int(date: Date) {
    const excelBaseDate = new Date('1900-01-01');
    const excelDate = new Date(date);
    const diff = excelDate.getTime() - excelBaseDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}
