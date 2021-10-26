import React from 'react';
import { Message } from 'semantic-ui-react';

export enum NotificationType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  WARNING = 'warning',
}

export type NotificationsProps = {
  message: string;
  type: NotificationType;
};

const Notification = ({ message, type }: NotificationsProps) => {
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
    <Message {...messageProps}>
      <Message.Header>{message}</Message.Header>
    </Message>
  );
};

export default Notification;
