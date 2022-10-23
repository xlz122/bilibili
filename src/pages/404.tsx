import type { ReactElement } from 'react';

function NotFound(): ReactElement {
  return (
    <>
      <div className="not-found">
        <h1 className="title">404</h1>
        <h3 className="msg">页面不存在，或已被删除！</h3>
      </div>
    </>
  );
}

export default NotFound;
