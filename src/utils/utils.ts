/**
 * @description 格式化数字
 * @param { string } num - 数值
 */
export function formatNumber(num: number): string {
  const numStr = num.toString();

  if (numStr.length <= 4) {
    return numStr;
  }

  let wholeNumber = numStr.substring(0, numStr.length - 4);
  let thousands = numStr.substring(numStr.length - 4);
  let decimalNumber = Number(
    thousands.substring(0, 1) + '.' + thousands.substring(1)
  ).toFixed(0);

  if (decimalNumber.length === 2) {
    decimalNumber = '0';
    wholeNumber = String(Number(wholeNumber) + 1);
  }

  return `${wholeNumber}.${decimalNumber}万`;
}

/**
 * @description 时间戳转视频时长
 * @param { number } timestamp - 时间戳
 * @return { string } 02:27/01:02:27
 */
export function timeStampToDuration(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  if (date.getUTCHours() === 0) {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}
