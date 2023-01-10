/**
 * @description 日期字符串/时间戳转日期字符串
 * @param { String | Number | Date } - date 日期字符串/时间戳/Date
 * @param { String } - 日期字符串格式
 */
export function formatDateTime(
  date: string | Date | number,
  fmt = 'yyyy-MM-dd hh:mm:ss'
): string {
  if (!date) {
    return '';
  }

  let d: Date = new Date();

  if (typeof date === 'number') {
    d = new Date(date * 1000);
  }
  if (typeof date === 'string') {
    d = new Date(new Date(date).getTime());
  }

  const o = {
    // 月份
    'M+': d.getMonth() + 1,
    // 日
    'd+': d.getDate(),
    // 小时
    'h+': d.getHours(),
    // 分
    'm+': d.getMinutes(),
    // 秒
    's+': d.getSeconds(),
    // 季度
    'q+': Math.floor((d.getMonth() + 3) / 3),
    // 毫秒
    S: d.getMilliseconds()
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt
      .replace(RegExp.$1, d.getFullYear() + '')
      .substr(4 - RegExp.$1.length);
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }

  return fmt;
}
