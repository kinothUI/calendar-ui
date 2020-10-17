import React from 'react';
import { useDispatch } from 'react-redux';

import { action } from 'redux/actions';
import { FETCH_OWN_ACCOUNT } from 'redux/actions/ownAccount';
import DefaultLayout from 'components/Layout/DefaultLayout';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(action(FETCH_OWN_ACCOUNT));
  }, [dispatch]);

  return (
    <React.Fragment>
      <DefaultLayout />
    </React.Fragment>
  );
};

export default App;
