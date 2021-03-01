import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';

import BrandButton from 'Layout/BrandButton';
import { LOGOUT } from 'redux/actions/ownAccount';
import { action } from 'redux/actions';
import { REQUEST_SAVE } from 'redux/actions/meeting';
import { getNextHourMoment } from 'helpers';
import MeetingForm from 'components/elements/forms/MeetingForm';
import { LanguageDropdown } from 'components/elements/inputs';
import { useModalStateProvider } from 'hooks/withModal';

const Navbar = (ownProps) => {
  const {
    user,
    isBackend,
    ownAccount,
    sidebar: { setVisible },
  } = ownProps;

  const { modalState } = useModalStateProvider();
  console.log('%c modalState', 'color: #ff0000', modalState);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (!user.isAuthenticated) {
    return (
      <nav>
        <Menu attached inverted borderless size="small" color="grey">
          <Container>
            <BrandButton />
          </Container>
        </Menu>
      </nav>
    );
  }

  return (
    <nav>
      <Menu attached inverted borderless size="small" color={isBackend ? 'black' : 'grey'}>
        <Container>
          <BrandButton />
          <Menu.Item
            position="right"
            content={t('navbar.new_meeting.label')}
            header
            onClick={() => {
              modalState.setSize('mini');
              modalState.setTitle(t('form-entities:meeting.header'));
              modalState.setChildComponent({ component: MeetingForm });
              modalState.setChildComponentProps({
                initialValues: { time: getNextHourMoment() },
                handleSubmit: (fields) => dispatch(action(`${REQUEST_SAVE}`, { meeting: fields })),
                modalState,
              });
              modalState.setFormName('MeetingForm');
              modalState.setOpen(true);
            }}
          />
          <Menu.Item
            position="right"
            content="meine Meetings"
            header
            onClick={() => setVisible((old) => !old)}
            className="no-margin-left"
          />
          <Menu.Item position="right" className="no-padding-margin">
            {isBackend && <LanguageDropdown isBackend />}
          </Menu.Item>
          <Menu.Item position="right" className="no-padding-margin">
            <Dropdown item text={`${ownAccount.content.firstName} ${ownAccount.content.lastName}`}>
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
