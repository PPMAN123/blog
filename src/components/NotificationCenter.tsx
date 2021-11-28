import React from 'react';
import Notification, { NotificationsProps } from './Notification';
import styled from 'styled-components';

const NotificationContainer = styled.section`
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 300px;
  max-height: 80vh;
  overflow: hidden;
`;

export type NotificationCenterProps = {
  notifications: Array<NotificationsProps>;
};

const NotificationCenter = (props: NotificationCenterProps) => {
  return (
    <NotificationContainer>
      {props.notifications.map((notificationProps) => (
        <Notification key={notificationProps.id} {...notificationProps} />
      ))}
    </NotificationContainer>
  );
};

export default NotificationCenter;
