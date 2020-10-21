import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { EntityDescriptions } from 'redux/reducers/entity';
import { action, FETCH, CREATE, UPDATE } from 'redux/actions';
import DataTable from 'components/elements/DataTable';

function TeamAdministration(ownProps) {
  const {
    modal: {
      modalState: {
        setTitle,
        setActionButtonState,
        setInitialValues,
        setOpen,
        setSize,
        setComponent,
        setHandleSubmit,
      },
      actionButtonDefaultState,
    },
  } = ownProps;

  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.entities);
  const { t } = useTranslation();
  const { TEAM } = EntityDescriptions;

  React.useEffect(() => {
    dispatch(
      action(`${FETCH}_${TEAM}`, {
        entityDescription: TEAM,
      }),
    );
    return () => console.log('TeamAdministration unmounted, useEffect clearup function');
  }, [dispatch, TEAM]);

  const handleOnDelete = (row) => {
    console.log('%c delete button handler in teamAdmin', 'color: red;', row);
  };

  const cols = [
    { dataKey: 'id', name: 'Kennzeichen' },
    { dataKey: 'name', name: 'Team-Name' },
  ];

  const component = 'TeamAdministrationForm';

  return (
    <React.Fragment>
      <Header as="h2" content={t(`backend.menu.${TEAM.toLowerCase()}.label`)} />
      <Divider />
      <DataTable
        cols={cols}
        rows={team.content}
        onCreate={() => {
          setSize('large');
          setTitle(t('form-entities:team.crud.add'));
          setComponent(component);
          setInitialValues({});
          setActionButtonState(actionButtonDefaultState);
          setHandleSubmit({
            form: (fields) =>
              dispatch(action(`${CREATE}_${TEAM}`, { entityDescription: TEAM, body: fields })),
          });
          setOpen(true);
        }}
        onEdit={(row) => {
          setSize('large');
          setTitle(t('form-entities:team.crud.edit', { name: row.name }));
          setComponent(component);
          setInitialValues(row);
          setActionButtonState(actionButtonDefaultState);
          setHandleSubmit({
            form: (fields) =>
              dispatch(action(`${UPDATE}_${TEAM}`, { entityDescription: TEAM, body: fields })),
          });
          setOpen(true);
        }}
        onDelete={handleOnDelete}
      />
    </React.Fragment>
  );
}

export default TeamAdministration;
