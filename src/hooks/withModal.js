import React, { useState, useMemo } from 'react';
import { Button, Modal as SemanticModal } from 'semantic-ui-react';

export const generateActionButtonState = ({ save: onProceede, cancel: onClose }) => ({
  save: {
    color: 'green',
    content: 'Speichern',
    icon: 'save',
    basic: true,
    size: 'tiny',
    onClick: onProceede,
  },
  cancel: {
    color: 'red',
    content: 'Abbrechen',
    icon: 'cancel',
    basic: true,
    size: 'tiny',
    onClick: onClose,
  },
});

/**
 * Custom Hook to use a Modal
 */
export function useModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('large');
  const [dimmer, setDimmer] = useState('blurring');
  const [initialValues, setInitialValues] = useState({});
  const [reduxAction, setReduxAction] = useState({});
  const [component, setComponent] = useState('MeetingForm');
  const [handleSubmit, setHandleSubmit] = useState({});

  const abDefaultState = generateActionButtonState({
    save: () => {},
    close: () => {},
  });

  const [actionButtonState, setActionButtonState] = useState({
    save: abDefaultState.save,
    cancel: abDefaultState.cancel,
  });

  const Modal = useModalComponent(open, size, title, dimmer, actionButtonState);

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
      initialValues,
      setInitialValues,
      reduxAction,
      setReduxAction,
      component,
      setComponent,
      actionButtonState,
      setActionButtonState,
      handleSubmit,
      setHandleSubmit,
    },
    Modal,
  };
}

function useModalComponent(open, size, title, dimmer, actionButtonState) {
  const Modal = useMemo(
    (modalOwnProps) => ({ children }) => (
      <SemanticModal open={open} size={size} dimmer={dimmer}>
        <SemanticModal.Header>{title}</SemanticModal.Header>
        <SemanticModal.Content>{children}</SemanticModal.Content>
        <SemanticModal.Actions>
          <Button {...actionButtonState.save} /> <Button {...actionButtonState.cancel} />
        </SemanticModal.Actions>
      </SemanticModal>
    ),
    [open, size, title, actionButtonState, dimmer],
  );

  return Modal;
}
