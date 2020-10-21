import React from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import Sidebar from 'Layout/Sidebar';
import Navbar from 'Layout/Navbar';
import FetchingLoader from 'Layout/FetchingLoader';
import AccountAdministrationForm from 'components/Backend/AccountAdministrationForm';
import TeamAdministrationForm from 'components/Backend/TeamAdministrationForm';
import RoomAdministrationForm from 'components/Backend/RoomAdministrationForm';
import MeetingForm from 'components/elements/forms/MeetingForm';
import { useModal, generateActionButtonState } from 'hooks/withModal';

function BackendLayout(ownProps) {
  const { component: Component, user } = ownProps;

  const { ownAccount } = useSelector((state) => state);
  const { modalState, Modal } = useModal();

  const actionButtonDefaultState = generateActionButtonState({
    save: () => {
      document
        .getElementById(`${Component.name}Form`)
        .dispatchEvent(new Event('submit', { cancelable: true }));
      modalState.setOpen(false);
    },
    cancel: () => modalState.setOpen(false),
  });

  const formFactory = (componentName) => {
    switch (componentName) {
      case 'AccountAdministrationForm':
        return AccountAdministrationForm;
      case 'TeamAdministrationForm':
        return TeamAdministrationForm;
      case 'RoomAdministrationForm':
        return RoomAdministrationForm;
      case 'MeetingForm':
        return MeetingForm;
      default:
        throw Error(`Unknown component name ${componentName}`);
    }
  };

  const Form = formFactory(modalState.component);

  console.log('modalState in BackendLayout render()', modalState);

  return (
    <React.Fragment>
      <Navbar modalState={modalState} user={user} isBackend={true} ownAccount={ownAccount} />
      <Sidebar />
      <Container as="main" className="backend-container">
        <Component modal={{ modalState, actionButtonDefaultState }} />
      </Container>
      <Modal>
        <Form
          handleSubmit={modalState.handleSubmit.form}
          initialValues={modalState.initialValues}
        />
      </Modal>
      <FetchingLoader />
    </React.Fragment>
  );
}

export default BackendLayout;
