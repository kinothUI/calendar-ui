import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';

import { action } from 'redux/actions';
import { FETCH_OWN_ACCOUNT } from 'redux/actions/ownAccount';
import BackendRoutes from 'routing/BackendRoutes';
import ProtectedRoutes from 'routing/ProtectedRoutes';
import PublicRoutes from 'routing/PublicRoutes';
import NotFound from 'routing/NotFound';
import AccountAdministration from 'components/Backend/AccountAdministration';
import TeamAdministration from 'components/Backend/TeamAdministration';
import RoomAdministration from 'components/Backend/RoomAdministration';
import LoginForm from 'components/elements/forms/LoginForm';
import Calendar from 'components/Calendar';

const App = () => {
  const dispatch = useDispatch();
  const { ownAccount } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(action(FETCH_OWN_ACCOUNT));
  }, [dispatch]);

  const isAuthenticated = !!ownAccount.content;
  const isAdmin = ownAccount.content && !!ownAccount.content.isAdmin;

  const user = { isAuthenticated, isAdmin };

  return (
    <Switch>
      <BackendRoutes path="/backend/account" exact component={AccountAdministration} user={user} />
      <BackendRoutes path="/backend/team" exact component={TeamAdministration} user={user} />
      <BackendRoutes path="/backend/room" exact component={RoomAdministration} user={user} />

      <PublicRoutes path="/login" component={LoginForm} user={user} />
      <ProtectedRoutes path="/" exact component={Calendar} user={user} />
      <PublicRoutes path="*" component={NotFound} user={user} />
    </Switch>
  );
};

export default App;
