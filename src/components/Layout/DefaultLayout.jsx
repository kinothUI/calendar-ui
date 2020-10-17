import React from 'react';
import { Dimmer, Image, Label, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import ConnectedApp from 'ConnectedApp';
import DefaultNavbar from 'components/Layout/DefaultNavbar';
import DefaultFooter from 'components/Layout/DefaultFooter';
import BackendSidebar from 'components/Layout/BackendSidebar';

function DefaultLayout() {
  const { router } = useSelector((state) => state);

  /**
   * @type {String}
   */
  const pathname = router.location.pathname;
  const isBackend = pathname.includes('/backend', 0);

  return (
    <React.Fragment>
      <React.Suspense fallback={FallBackLoader}>
        <DefaultNavbar />

        {isBackend && <BackendSidebar />}

        <div>
          <ConnectedApp />
        </div>

        {!isBackend && <DefaultFooter />}
      </React.Suspense>
    </React.Fragment>
  );
}

export const FallBackLoader = (
  <Dimmer active page inverted>
    <Loader size="large">
      <Label circular basic size="large" color="grey">
        Loading App
      </Label>
    </Loader>
  </Dimmer>
);

export default DefaultLayout;
