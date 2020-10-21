import React from 'react';
import { Route } from 'react-router-dom';

import BackendScene from 'scenes/BackendScene';
import BackendLayout from 'Layout/BackendLayout';

const BackendRoutes = (ownProps) => {
  const { component: Component, user, ...rest } = ownProps;

  return (
    <Route
      {...rest}
      render={(props) => (
        <BackendScene user={user}>
          <BackendLayout {...props} component={Component} user={user} {...ownProps} />
        </BackendScene>
      )}
    />
  );
};

export default BackendRoutes;
