import React from 'react';
import { Route } from 'react-router-dom';

import PublicLayout from 'Layout/PublicLayout';

const PublicRoutes = (ownProps) => {
  const { component: Component, ...rest } = ownProps;

  return (
    <Route
      {...rest}
      render={(props) => <PublicLayout {...props} component={Component} {...ownProps} />}
    />
  );
};

export default PublicRoutes;
