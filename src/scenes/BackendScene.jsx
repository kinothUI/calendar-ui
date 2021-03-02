import React from 'react';

import useGlobalContextProvider from 'context/globalContextProvider';
import NoAuthRedirect from 'routing/NoAuthRedirect';
import AccessDenied from 'routing/AccessDenied';

function BackendScene(ownProps) {
  const { children } = ownProps;

  const { user } = useGlobalContextProvider();

  if (!user.isAuthenticated) return <NoAuthRedirect />;
  if (user.isAuthenticated && !user.isAdmin) return <AccessDenied />;

  return <React.Fragment>{children}</React.Fragment>;
}

export default BackendScene;
