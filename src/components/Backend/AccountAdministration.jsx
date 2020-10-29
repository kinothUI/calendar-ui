import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { action, FETCH, CREATE, UPDATE, DELETE } from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import DataTable from 'components/elements/DataTable';
import AccountAdministrationForm from 'components/Backend/AccountAdministrationForm';

function AccountAdministration(ownProps) {
  const {
    modalState: {
      setTitle,
      setOpen,
      setSize,
      setChildComponent,
      setChildComponentProps,
      setOnProceed,
      setFormName,
    },
  } = ownProps;

  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.entities);
  const { t } = useTranslation();
  const { ACCOUNT } = EntityDescriptions;

  React.useEffect(() => {
    dispatch(
      action(`${FETCH}_${ACCOUNT}`, {
        entityDescription: ACCOUNT,
      }),
    );
    return () => console.log('AccountAdministration unmounted, useEffect cleanup');
  }, [dispatch, ACCOUNT]);

  const transKeySelf = `${ACCOUNT.toLowerCase()}_administration`;

  const cols = [
    { dataKey: 'id', name: t('form-entities:table.identifier') },
    { dataKey: 'name', name: t(`form-entities:${transKeySelf}.table.first_name`) },
    { dataKey: 'surname', name: t(`form-entities:${transKeySelf}.table.last_name`) },
    { dataKey: 'email', name: t(`form-entities:${transKeySelf}.table.email`) },
  ];

  return (
    <React.Fragment>
      <Header as="h2" content={t(`backend.menu.account.label`)} />
      <DataTable
        cols={cols}
        rows={account.content}
        onCreate={() => {
          setSize('large');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.add`));
          setChildComponent({ component: AccountAdministrationForm });
          setChildComponentProps({
            handleSubmit: (fields) =>
              dispatch(
                action(`${CREATE}_${ACCOUNT}`, { entityDescription: ACCOUNT, body: fields }),
              ),
            isCreate: true,
          });
          setFormName('AccountAdministrationForm');
          setOpen(true);
        }}
        onEdit={(row) => {
          setSize('large');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.edit`, { name: row.email }));
          setChildComponent({ component: AccountAdministrationForm });
          setChildComponentProps({
            handleSubmit: (fields) =>
              dispatch(
                action(`${UPDATE}_${ACCOUNT}`, {
                  entityDescription: ACCOUNT,
                  body: fields,
                }),
              ),
            isCreate: false,
            initialValues: row,
          });
          setFormName('AccountAdministrationForm');
          setOpen(true);
        }}
        onDelete={({ name, surname, id }) => {
          setSize('tiny');
          setTitle(t(`form-entities:${transKeySelf}.modal.header.delete`));
          setChildComponent({
            component: t(`form-entities:${transKeySelf}.modal.body.delete`, {
              name: `${name} ${surname}`,
            }),
          });
          setOnProceed({
            proceedAction: () =>
              dispatch(action(`${DELETE}_${ACCOUNT}`, { entityDescription: ACCOUNT, id })),
          });
          setFormName(false);
          setOpen(true);
        }}
      />
    </React.Fragment>
  );
}

export default AccountAdministration;
