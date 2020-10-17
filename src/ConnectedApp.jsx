import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Calendar from 'components/Calendar';
import LoginForm from 'components/elements/forms/LoginForm';
import UserAdministration from 'components/Backend/AccountAdministration';
import TeamAdministration from 'components/Backend/TeamAdministration';
import RoomAdministration from 'components/Backend/RoomAdministration';
import NoAuthRedirect from 'routing/NoAuthRedirect';
import FetchingLoader from 'components/Layout/FetchingLoader';

const ConnectedApp = (props) => {
  const { ownAccount } = useSelector((state) => state);

  const isAuthenticated = !!ownAccount.content;

  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/calendar"
          render={() =>
            isAuthenticated ? (
              <Calendar />
            ) : (
              <NoAuthRedirect pathname="/login" />
            )
          }
        />
        <Route
          path="/backend/account"
          render={() => (
            <Container as="main">
              <UserAdministration />
            </Container>
          )}
        />
        <Route
          path="/backend/group"
          render={() => (
            <Container as="main">
              <TeamAdministration />
            </Container>
          )}
        />
        <Route
          path="/backend/room"
          render={() => (
            <Container as="main">
              <RoomAdministration />
            </Container>
          )}
        />
        <Route path="/login" component={LoginForm} />
        <Route path="/" exact component={Calendar} />
        <Route path="*" component={() => <h2>404 NOT FOUND</h2>} />
      </Switch>
      <FetchingLoader />
    </React.Fragment>
  );
};

export default ConnectedApp;
