import React from 'react';

function Live(): React.ReactElement {
  return <div>live</div>;
}

Live.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Live;
