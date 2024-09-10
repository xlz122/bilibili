import React from 'react';
import Image from 'next/image';

function NotFound(): React.ReactElement {
  return (
    <div className="not-found">
      <Image width="300" height="168" src="/images/not-found.png" alt="" />
      <p className="tip">Σ(oﾟдﾟoﾉ) 无法找到该页面~</p>
    </div>
  );
}

export default NotFound;
