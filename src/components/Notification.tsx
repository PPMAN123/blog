import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { useNotificationContext } from '../context/NotificationContext';

export enum NotificationType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  WARNING = 'warning',
}

export type NotificationsProps = {
  message: string;
  type: NotificationType;
  id: string;
};

const NotificationButton = styled.button`
  position: absolute;
  padding: 0.25rem;
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const NotificationContainer = styled.div`
  position: relative;
  &:hover {
    &:before {
      background-color: rgba(0, 0, 0, 0.5);
    }
    ${NotificationButton} {
      opacity: 1;
    }
  }
  &:before {
    left: 0;
    top: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.1s ease-in;
  }
`;

const Notification = ({ message, type, id }: NotificationsProps) => {
  const { removeNotificationWithId } = useNotificationContext();
  let messageProps = {};
  switch (type) {
    case NotificationType.POSITIVE:
      messageProps = { positive: true };
      break;
    case NotificationType.NEGATIVE:
      messageProps = { negative: true };
      break;
    case NotificationType.WARNING:
      messageProps = { warning: true };
      break;
  }
  return (
    <NotificationContainer>
      <Message {...messageProps}>
        <Message.Header>{message}</Message.Header>
      </Message>
      <NotificationButton onClick={() => removeNotificationWithId(id)}>
        <Icon name="times" />
      </NotificationButton>
    </NotificationContainer>
  );
};

export default Notification;
