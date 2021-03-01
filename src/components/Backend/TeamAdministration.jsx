import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { EntityDescriptions } from 'redux/reducers/entity';
import { action, FETCH, CREATE, UPDATE, DELETE } from 'redux/actions';
import DataTable from 'components/elements/DataTable';
import TeamAdministrationForm from 'components/Backend/TeamAdministrationForm';
import { useModalStateProvider } from 'hooks/withModal';

function TeamAdministration() {
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

  const transKeySelf = `${TEAM.toLowerCase()}_administration`;

  const cols = [
    { dataKey: 'id', name: t('form-entities:table.identifier') },
    { dataKey: 'name', name: t(`form-entities:${transKeySelf}.table.name`) },
  ];

  return (
    <React.Fragment>
      <Header as="h2" content={t(`backend.menu.team.label`)} />
      <DataTable
        cols={cols}
        rows={team.content}
        onCreate={() => {
          setSize('large');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.add`));
          setChildComponent({ component: TeamAdministrationForm });
          setChildComponentProps({
            handleSubmit: (fields) =>
              dispatch(action(`${CREATE}_${TEAM}`, { entityDescription: TEAM, body: fields })),
            isCreate: true,
          });
          setFormName('TeamAdministrationForm');
          setOpen(true);
        }}
        onEdit={(row) => {
          setSize('large');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.edit`, { name: row.name }));
          setChildComponent({ component: TeamAdministrationForm });
          setChildComponentProps({
            handleSubmit: (fields) =>
              dispatch(action(`${UPDATE}_${TEAM}`, { entityDescription: TEAM, body: fields })),
            isCreate: false,
            initialValues: row,
          });
          setFormName('TeamAdministrationForm');
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
              dispatch(action(`${DELETE}_${TEAM}`, { entityDescription: TEAM, id })),
          });
          setFormName(false);
          setOpen(true);
        }}
      />
    </React.Fragment>
  );
}

export default TeamAdministration;
