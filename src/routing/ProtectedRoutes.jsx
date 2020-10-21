import React from 'react';
import { Route } from 'react-router-dom';

import ProtectedScene from 'scenes/CalendarScene';
import PublicLayout from 'Layout/PublicLayout';

const ProtectedRoutes = (ownProps) => {
  const { component: Component, user, ...rest } = ownProps;

  return (
    <Route
      {...rest}
      render={(props) => (
        <ProtectedScene user={user}>
          <PublicLayout {...props} component={Component} {...ownProps} />
        </ProtectedScene>
      )}
    />
  );
};

export default ProtectedRoutes;
