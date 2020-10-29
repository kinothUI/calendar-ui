import React, { createRef } from 'react';
import { Container, Visibility, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import Sidebar from 'Layout/Sidebar';
import Navbar from 'Layout/Navbar';
import FetchingLoader from 'Layout/FetchingLoader';
import { useModal } from 'hooks/withModal';

function BackendLayout(ownProps) {
  const { component: Component, user } = ownProps;

  const [navOffset, setNavOffset] = React.useState(0);
  const { ownAccount } = useSelector((state) => state);
  const { modalState, Modal } = useModal();

  return (
    <React.Fragment>
      <Visibility onUpdate={(onUpdateProps, data) => console.log("onUpdateProps, data:", onUpdateProps, data)} onTopPassed={(onTopPassedProps) => console.log("top moved out of viewport! onTopPassedProps:", onTopPassedProps)}>
      <div className="main-nav">
        <Navbar modalState={modalState} user={user} isBackend={true} ownAccount={ownAccount} />
        <Divider fitted hidden />
      </div>
      </Visibility>
      <Sidebar />
      <Container as="main" className="backend-container">
        <Component modalState={modalState} />
      </Container>
      <Modal />
      <FetchingLoader />
      <div style={{ minHeight: '15vh' }} />
    </React.Fragment>
  );
}

export default BackendLayout;
