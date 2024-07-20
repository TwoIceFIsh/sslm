import moment from 'moment';

export default function date2StringFormat(data: Date) {
    // 날짜를 원하는 형식으로 포맷팅 (예: YYYY-MM-DD)
    return moment(data).format('YYYY/MM/DD');
}