import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
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

const NotificationContainer = styled.div<{ hover: boolean }>`
  @keyframes slideIn {
    0% {
      transform: translateX(-200px);
      opacity: 0.2;
    }
    100% {
      transform: traslateX(0px);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }
    100% {
      transform: translateX(-200px);
      opacity: 0.2;
    }
  }
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
  animation: slideIn 0.6s ease-out forwards${(p) =>
    p.hover ? ';' : ', slideOut 0.6s ease-in forwards;'}
  animation-delay: 0s${(p) => (p.hover ? ';' : ', 2s;')}
`;

const StyledIcon = styled(Icon)`
  && {
    margin-right: 0;
  }
`;

const Notification = ({ message, type, id }: NotificationsProps) => {
  const {
    removeNotificationWithId,
    removeTimeOutStatus,
    notificationTimeoutStatus,
    addTimeOutStatus,
  } = useNotificationContext();
  const [hover, setHover] = React.useState(false);
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

  React.useEffect(() => {
    console.log(hover, notificationTimeoutStatus[id]);
    if (hover) {
      removeTimeOutStatus(id, notificationTimeoutStatus[id]);
    } else {
      if (!notificationTimeoutStatus[id]) {
        addTimeOutStatus(id);
      }
    }
  }, [hover]);

  return (
    <NotificationContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
    >
      <Message {...messageProps}>
        <Message.Header>{message}</Message.Header>
      </Message>
      <NotificationButton onClick={() => removeNotificationWithId(id)}>
        <StyledIcon name="times" />
      </NotificationButton>
    </NotificationContainer>
  );
};

export default Notification;
