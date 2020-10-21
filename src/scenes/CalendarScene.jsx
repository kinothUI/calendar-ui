import React from 'react';

import NoAuthRedirect from 'routing/NoAuthRedirect';

function CalendarScene(ownProps) {
  const { children, user } = ownProps;
  if (!user.isAuthenticated) return <NoAuthRedirect />;

  return <React.Fragment>{children}</React.Fragment>;
}

export default CalendarScene;
