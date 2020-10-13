import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Container, Dimmer, Loader } from 'semantic-ui-react';

import { action } from 'redux/actions';
import { FETCH_OWN_ACCOUNT } from 'redux/actions/ownAccount';
import ConnectedApp from 'ConnectedApp';
import DefaultNavbar from 'components/Layout/DefaultNavbar';
import DefaultFooter from 'components/Layout/DefaultFooter';

const App = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(action(FETCH_OWN_ACCOUNT));
  }, [dispatch]);

  return (
    <React.Fragment>
      <React.Suspense fallback={FallBackLoader}>
        <DefaultNavbar />
      </React.Suspense>

      <div className="main-content">
        <Container as="main">
          <Grid columns="1" centered>
            <Grid.Column>
              <React.Suspense fallback={FallBackLoader}>
                <ConnectedApp />
              </React.Suspense>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      <DefaultFooter />
    </React.Fragment>
  );
};

const FallBackLoader = (
  <Dimmer active page inverted>
    <Loader>Loading App</Loader>
  </Dimmer>
);

export default App;
