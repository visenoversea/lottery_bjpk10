export function formatDate (timestamp) {
    // 创建一个Date对象，使用时间戳初始化
    const date = new Date(timestamp * 1000); // 乘以1000将秒转换为毫秒

    // 使用模板字符串拼接月份和日期，保证格式为两位数
    const month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    // 使用模板字符串拼接小时和分钟，保证格式为两位数
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');

    // 使用模板字符串拼接成指定格式的字符串
    const formattedDate = `${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
};
