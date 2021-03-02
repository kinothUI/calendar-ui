import React from 'react';

import useGlobalContextProvider from 'context/globalContextProvider';
import NoAuthRedirect from 'routing/NoAuthRedirect';

function CalendarScene(ownProps) {
  const { children } = ownProps;
  const { user } = useGlobalContextProvider();

  if (!user.isAuthenticated) return <NoAuthRedirect />;

  return <React.Fragment>{children}</React.Fragment>;
}

export default CalendarScene;
