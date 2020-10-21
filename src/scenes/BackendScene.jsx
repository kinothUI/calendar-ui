import React from 'react';

import NoAuthRedirect from 'routing/NoAuthRedirect';
import AccessDenied from 'routing/AccessDenied';

function BackendScene(ownProps) {
  const { user, children } = ownProps;

  if (!user.isAuthenticated) return <NoAuthRedirect />;
  if (user.isAuthenticated && !user.isAdmin) return <AccessDenied />;

  return <React.Fragment>{children}</React.Fragment>;
}

export default BackendScene;
