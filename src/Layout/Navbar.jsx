import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { LOGOUT } from 'redux/actions/ownAccount';
import { action } from 'redux/actions';
import { REQUEST_SAVE } from 'redux/actions/meeting';
import { getNextHourMoment } from 'helpers';
import MeetingForm from 'components/elements/forms/MeetingForm';
import { LanguageDropdown } from 'components/elements/inputs';

const Navbar = (ownProps) => {
  const { modalState, user, isBackend, ownAccount } = ownProps;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (!user.isAuthenticated) {
    return (
      <nav>
        <Menu attached inverted borderless size="small" color="grey">
          <Container>{renderBrandButton()}</Container>
        </Menu>
      </nav>
    );
  }

  return (
    <nav>
      <Menu attached inverted borderless size="small" color={isBackend ? 'black' : 'grey'}>
        <Container>
          {renderBrandButton()}
          <Menu.Item
            position="right"
            content={t('navbar.new_meeting.label')}
            header
            onClick={() => {
              modalState.setSize('mini');
              modalState.setTitle(t('form-entities:meeting.header'));
              modalState.setChildComponent({ component: MeetingForm });
              modalState.setChildComponentProps({
                time: getNextHourMoment(),
                handleSubmit: (fields) => dispatch(action(`${REQUEST_SAVE}`, { meeting: fields })),
                modalState,
              });
              modalState.setFormName('MeetingForm');
              modalState.setOpen(true);
            }}
          />
          <Menu.Item position="right" className="no-padding-margin">
            {isBackend && <LanguageDropdown isBackend />}
          </Menu.Item>
          <Menu.Item position="right" className="no-padding-margin">
            <Dropdown item text={`${ownAccount.content.name} ${ownAccount.content.surname}`}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => console.log('programmier mich')}>
                  {t('navbar.menu.account_settings.label')}
                </Dropdown.Item>
                {user.isAdmin && (
                  <Dropdown.Item onClick={() => dispatch(push('/backend/account'))}>
                    Administration
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => dispatch(action(LOGOUT))}>
                  {t('form-entities:auth.logout')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
    </nav>
  );
};

export default Navbar;

const renderBrandButton = () => (
  <Menu.Item position="left" className="brand-button-container" header as={Link} to="/">
    <div className="brand-button" />
  </Menu.Item>
);
