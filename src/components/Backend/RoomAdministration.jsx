import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Header, Divider } from 'semantic-ui-react';

import { EntityDescriptions } from 'redux/reducers/entity';
import { action, CREATE, FETCH, UPDATE } from 'redux/actions';
import DataTable from 'components/elements/DataTable';

function RoomAdministration(ownProps) {
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
  const { room } = useSelector((state) => state.entities);
  const { t } = useTranslation();
  const { ROOM } = EntityDescriptions;

  React.useEffect(() => {
    dispatch(
      action(`${FETCH}_${ROOM}`, {
        entityDescription: ROOM,
      }),
    );
    return () => console.log('RoomAdministration unmounted, useEffect clearup function');
  }, [dispatch, ROOM]);

  const handleOnDelete = (row) => {
    console.log('%c delete button handler in roomAdmin', 'color: red;', row);
  };

  const cols = [
    { dataKey: 'id', name: 'Kennzeichzen' },
    { dataKey: 'name', name: 'Besprechungsraum-Name' },
  ];

  const component = 'RoomAdministrationForm';

  return (
    <React.Fragment>
      <Header as="h2" content={t(`backend.menu.${ROOM.toLowerCase()}.label`)} />
      <Divider />
      <DataTable
        cols={cols}
        rows={room.content}
        onCreate={() => {
          setSize('large');
          setTitle(t('form-entities:room.crud.add'));
          setComponent(component);
          setInitialValues({});
          setActionButtonState(actionButtonDefaultState);
          setHandleSubmit({
            form: (fields) =>
              dispatch(action(`${CREATE}_${ROOM}`, { entityDescription: ROOM, body: fields })),
          });
          setOpen(true);
        }}
        onEdit={(row) => {
          setSize('large');
          setTitle(t('form-entities:room.crud.edit', { name: row.name }));
          setComponent(component);
          setInitialValues(row);
          setActionButtonState(actionButtonDefaultState);
          setHandleSubmit({
            form: (fields) =>
              dispatch(action(`${UPDATE}_${ROOM}`, { entityDescription: ROOM, body: fields })),
          });
          setOpen(true);
        }}
        onDelete={handleOnDelete}
      />
    </React.Fragment>
  );
}

export default RoomAdministration;
