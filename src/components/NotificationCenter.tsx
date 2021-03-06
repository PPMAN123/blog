import React from 'react';
import Notification, { NotificationsProps } from './Notification';
import styled from 'styled-components';

const NotificationContainer = styled.section`
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: 300px;
`;

export type NotificationCenterProps = {
  notifications: Array<NotificationsProps>;
};

const NotificationCenter = (props: NotificationCenterProps) => {
  return (
    <NotificationContainer>
      {props.notifications.slice(0, 10).map((notificationProps) => (
        <Notification key={notificationProps.id} {...notificationProps} />
      ))}
    </NotificationContainer>
  );
};

export default NotificationCenter;
