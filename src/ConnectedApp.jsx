import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import Calendar from 'components/Calendar';
import LoginForm from 'components/elements/forms/LoginForm';
import NoAuthRedirect from 'routing/NoAuthRedirect';

const ConnectedApp = () => {
  const { ownAccount } = useSelector((state) => state);

  const isAuthenticated = !!ownAccount.content;

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Calendar} />
        <Route
          path="/calendar"
          exact
          render={() =>
            isAuthenticated ? (
              <Calendar />
            ) : (
              <NoAuthRedirect pathname="/login" />
            )
          }
        />
        <Route path="/login" exact component={LoginForm} />
        <Route path="*" component={() => <h2>404 NOT FOUND</h2>} />
      </Switch>
      <Dimmer active={ownAccount.isFetching} page inverted>
        <Loader>Loading App</Loader>
      </Dimmer>
    </React.Fragment>
  );
};

export default ConnectedApp;
