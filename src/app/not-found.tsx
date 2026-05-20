import React from 'react';
import Image from 'next/image';

function NotFound(): React.ReactElement {
  return (
    <div className="not-found">
      <div className="tip-icon">
        <Image src="/images/not-found.png" fill priority sizes="50%" alt="" />
      </div>
      <p className="tip">Σ(oﾟдﾟoﾉ) 无法找到该页面~</p>
    </div>
  );
}

export default NotFound;
