import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal as SemanticModal, Header, Icon } from 'semantic-ui-react';

const getOnProceedDefaultProps = (formName, setOpen, t) => ({
  content: t('form-entities:buttons.save'),
  icon: 'save',
  size: 'tiny',
  color: 'green',
  basic: true,
  onClick: () => {
    document.getElementById(formName).dispatchEvent(new Event('submit', { cancelable: true }));
    setOpen(false);
  },
});

const getOnCloseDefaultProps = (setOpen, t) => ({
  content: t('form-entities:buttons.cancel'),
  icon: 'cancel',
  size: 'tiny',
  color: 'red',
  basic: true,
  onClick: () => setOpen(false),
});

const getOnProceedDeleteModalProps = (setOpen, { proceedAction }, t) => ({
  content: t('form-entities:buttons.yes'),
  icon: 'save',
  color: 'green',
  inverted: true,
  onClick: () => {
    proceedAction();
    setOpen(false);
  },
});

const getOnCloseDeleteModalProps = (setOpen, t) => ({
  content: t('form-entities:buttons.no'),
  icon: 'remove',
  color: 'red',
  basic: true,
  inverted: true,
  onClick: () => setOpen(false),
});

/**
 * Custom Hook to use a Modal
 */
export function useModal() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('large');
  const [dimmer, setDimmer] = useState(true); // true | 'blurring' | 'inverted' | SemanticShorthandItem<ModalDimmerProps>
  const [childComponent, setChildComponent] = useState({ component: '' });
  const [childComponentProps, setChildComponentProps] = useState({ isCreate: true });
  const [onProceed, setOnProceed] = useState({ proceedAction: () => {} });
  const [formName, setFormName] = useState('');

  const [actionButtonState, setActionButtonState] = useState({
    save: getOnProceedDefaultProps(formName, setOpen, t),
    close: getOnCloseDefaultProps(setOpen, t),
  });

  /**
   * Change Modal Actions apperance for Delete Dialogs
   */
  useMemo(() => {
    if (formName) {
      setActionButtonState({
        save: getOnProceedDefaultProps(formName, setOpen, t),
        close: getOnCloseDefaultProps(setOpen, t),
      });
    } else {
      setActionButtonState({
        save: getOnProceedDeleteModalProps(setOpen, onProceed, t),
        close: getOnCloseDeleteModalProps(setOpen, t),
      });
    }
  }, [formName, onProceed, t]);

  const Modal = useModalComponent(
    open,
    size,
    title,
    childComponent,
    childComponentProps,
    dimmer,
    formName,
    actionButtonState,
  );

  return {
    modalState: {
      open,
      setOpen,
      title,
      setTitle,
      size,
      setSize,
      dimmer,
      setDimmer,
      childComponent,
      setChildComponent,
      childComponentProps,
      setChildComponentProps,
      onProceed,
      setOnProceed,
      formName,
      setFormName,
    },
    Modal,
  };
}

function useModalComponent(
  open,
  size,
  title,
  childComponent,
  childComponentProps,
  dimmer,
  formName,
  actionButtonState,
) {
  const Modal = useMemo(
    () => () => {
      const {
        open,
        size,
        dimmer,
        title,
        actionButtonState,
        formName,
        childComponent: { component },
        childComponentProps,
      } = Modal.props;

      console.log('actionButtonState in useModalComponent', actionButtonState);

      return (
        <SemanticModal open={open} size={size} dimmer={dimmer} basic={formName ? false : true}>
          {renderTitle(title, formName)}
          <SemanticModal.Content>
            {renderContent({ component, childComponentProps })}
          </SemanticModal.Content>
          <SemanticModal.Actions>
            <Button {...actionButtonState.close} id="close-button" />
            <Button {...actionButtonState.save} id="save-button" />
          </SemanticModal.Actions>
        </SemanticModal>
      );
    },
    [],
  );

  Modal.props = {
    open,
    size,
    title,
    dimmer,
    formName,
    actionButtonState,
    childComponent,
    childComponentProps,
  };

  return Modal;
}

const renderTitle = (title, formName) =>
  formName ? (
    <SemanticModal.Header>{title}</SemanticModal.Header>
  ) : (
    <Header icon>
      <Icon name="remove" />
      {title}
    </Header>
  );

const renderContent = (ownProps) => {
  const { component, childComponentProps } = ownProps;

  if (typeof component === 'string') return component;

  const Component = component;
  return <Component {...childComponentProps} />;
};
