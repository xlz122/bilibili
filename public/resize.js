const resizeObserver = new ResizeObserver(() => {
  let clientWidth = document.documentElement.clientWidth;

  if (clientWidth >= 750) clientWidth = 750;

  const fontSize = (20 / 375) * clientWidth;
  document.documentElement.style.fontSize = fontSize + 'px';
});

resizeObserver.observe(document.querySelector('html'));
