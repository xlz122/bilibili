'use client';

import React from 'react';
import Image from 'next/image';

function Error(): React.ReactElement {
  return (
    <div className="error">
      <Image width="108" height="116" src="/images/error.png" alt="" />
      <p className="tip">抱歉, 服务器出错啦/(ToT)/~~</p>
    </div>
  );
}

export default Error;
