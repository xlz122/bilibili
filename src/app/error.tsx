'use client';

import React from 'react';
import Image from 'next/image';

function Error(): React.ReactElement {
  return (
    <div className="error">
      <div className="tip-icon">
        <Image src="/images/error.png" fill priority sizes="50%" alt="" />
      </div>
      <p className="tip">抱歉, 服务器出错啦/(ToT)/~~</p>
    </div>
  );
}

export default Error;
