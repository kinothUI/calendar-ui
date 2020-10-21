import React from 'react';

function PublicScene(ownProps) {
  const { children } = ownProps;

  return <React.Fragment>{children}</React.Fragment>;
}

export default PublicScene;
