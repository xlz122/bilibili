/**
 * @description 根字体适配不同屏幕大小
 */
export default function adapter() {
  let clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;

  if (clientWidth >= 640) {
    clientWidth = 640;
  }

  const fontSize = (20 / 375) * clientWidth;
  document.documentElement.style.fontSize = fontSize + 'px';
}
