import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { LOGOUT } from 'redux/actions/ownAccount';
import { action } from 'redux/actions';
import { REQUEST_SAVE } from 'redux/actions/meeting';
import { generateActionButtonState } from 'hooks/withModal';
import { getNextHourMoment } from 'helpers';

const Navbar = (ownProps) => {
  console.log('ownProps in Navbar', ownProps);
  const { modalState, user, isBackend, ownAccount } = ownProps;
  const {
    setOpen,
    setTitle,
    setSize,
    setActionButtonState,
    setComponent,
    setHandleSubmit,
    setInitialValues,
  } = modalState;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (!user.isAuthenticated) {
    return (
      <Menu attached inverted borderless size="small" color="grey">
        <Container>{renderBrandButton()}</Container>
      </Menu>
    );
  }

  const actionButtonDefaultState = generateActionButtonState({
    save: () => {
      document
        .getElementById('MeetingForm')
        .dispatchEvent(new Event('submit', { cancelable: true }));
      setOpen(false);
    },
    cancel: () => setOpen(false),
  });

  return (
    <React.Fragment>
      <Menu attached inverted borderless size="small" color={isBackend ? 'black' : 'grey'}>
        <Container>
          {renderBrandButton()}
          <Menu.Item
            position="right"
            content="neues Meeting"
            header
            onClick={() => {
              setSize('mini');
              setTitle('neues Meeting anlegen');
              setComponent('MeetingForm');
              setInitialValues({ time: getNextHourMoment() });
              setActionButtonState(actionButtonDefaultState);
              setHandleSubmit({
                form: (fields) => dispatch(action(`${REQUEST_SAVE}`, { meeting: fields })),
              });
              setOpen(true);
            }}
          />
          <Menu.Item position="right" className="no-padding-margin">
            <Dropdown item text={`${ownAccount.content.name} ${ownAccount.content.surname}`}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => console.log('programmier mich')}>
                  Account Einstellungen
                </Dropdown.Item>
                {user.isAdmin && (
                  <Dropdown.Item onClick={() => dispatch(push('/backend/account'))}>
                    Administration
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => dispatch(action(LOGOUT))}>
                  {t('auth.logout')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
    </React.Fragment>
  );
};

export default Navbar;

const renderBrandButton = () => (
  <Menu.Item position="left" className="brand-button-container" header as={Link} to="/">
    <div className="brand-button" />
  </Menu.Item>
);
