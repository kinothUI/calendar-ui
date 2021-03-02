import React from 'react';
import { Route } from 'react-router-dom';

import BackendScene from 'scenes/BackendScene';
import BackendLayout from 'Layout/BackendLayout';

const BackendRoutes = (ownProps) => {
  const { component: Component, ...rest } = ownProps;

  return (
    <Route
      {...rest}
      render={(props) => (
        <BackendScene>
          <BackendLayout {...props} component={Component} {...ownProps} />
        </BackendScene>
      )}
    />
  );
};

export default BackendRoutes;
