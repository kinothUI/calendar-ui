import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Header } from 'semantic-ui-react';

import { EntityDescriptions } from 'redux/reducers/entity';
import { action, CREATE, DELETE, FETCH, UPDATE } from 'redux/actions';
import DataTable from 'components/elements/DataTable';
import RoomAdministrationForm from 'components/Backend/RoomAdministrationForm';
import { useModalStateProvider } from 'hooks/withModal';

function RoomAdministration() {
  const { modalState } = useModalStateProvider();
  const {
    setTitle,
    setOpen,
    setSize,
    setChildComponent,
    setChildComponentProps,
    setOnProceed,
    setFormName,
  } = modalState;

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
    return () => console.log('RoomAdministration unmounted, useEffect cleanup function');
  }, [dispatch, ROOM]);

  const transKeySelf = `${ROOM.toLowerCase()}_administration`;

  const cols = [
    { dataKey: 'id', name: t('form-entities:table.identifier') },
    { dataKey: 'name', name: t(`form-entities:${transKeySelf}.table.name`) },
  ];

  return (
    <React.Fragment>
      <Header as="h2" content={t(`backend.menu.room.label`)} />
      <DataTable
        cols={cols}
        rows={room.content}
        onCreate={() => {
          setSize('large');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.add`));
          setChildComponent({ component: RoomAdministrationForm });
          setChildComponentProps({
            handleSubmit: (fields) =>
              dispatch(action(`${CREATE}_${ROOM}`, { entityDescription: ROOM, body: fields })),
            isCreate: true,
          });
          setFormName('RoomAdministrationForm');
          setOpen(true);
        }}
        onEdit={(row) => {
          setSize('large');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.edit`, { name: row.name }));
          setChildComponent({ component: RoomAdministrationForm });
          setChildComponentProps({
            handleSubmit: (fields) =>
              dispatch(action(`${UPDATE}_${ROOM}`, { entityDescription: ROOM, body: fields })),
            isCreate: false,
            initialValues: row,
          });
          setFormName('RoomAdministrationForm');
          setOpen(true);
        }}
        onDelete={({ name, id }) => {
          setSize('tiny');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.delete`));
          setChildComponent({
            component: t(`form-entities:${transKeySelf}.modal.body.delete`, {
              name,
            }),
          });
          setOnProceed({
            proceedAction: () =>
              dispatch(action(`${DELETE}_${ROOM}`, { entityDescription: ROOM, id })),
          });
          setFormName(false);
          setOpen(true);
        }}
      />
    </React.Fragment>
  );
}

export default RoomAdministration;
