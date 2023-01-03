/**
 * 格式化数字
 * 1218807 => 121.9万
 */
export function formatTenThousand(num: number): string {
  const numStr = String(num);

  if (numStr.length <= 4) {
    return numStr;
  }

  let wholeNumber = numStr.substring(0, numStr.length - 4);
  const thousands = numStr.substring(numStr.length - 4);
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
 * @return { String } 视频时长 01:23:45
 */
export function timeStampToDuration(timeStamp: number): string {
  const time = timeStamp.toString();
  let h = 0,
    i = 0,
    s = parseInt(time);
  if (s > 60) {
    i = parseInt((s / 60).toString());
    s = parseInt((s % 60).toString());
    if (i > 60) {
      h = parseInt((i / 60).toString());
      i = parseInt((i % 60).toString());
    }
  }
  // 补零
  const zero = function (v: number) {
    return v >> 0 < 10 ? '0' + v : v;
  };
  const h2 = zero(h);
  const i2 = zero(i);
  const s2 = zero(s);
  let ok = '';
  if (h2 <= 0) {
    ok = [i2, s2].join(':');
  } else {
    ok = [h2, i2, s2].join(':');
  }

  return ok;
}
