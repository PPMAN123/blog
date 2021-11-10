import React from 'react';
import Notification, { NotificationsProps } from './Notification';
import styled from 'styled-components';
import { useNotificationContext } from '../context/NotificationContext';
import { usePrevious } from '../hooks/usePrevious';
import _ from 'lodash';

const NotificationContainer = styled.section`
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 300px;
`;

export type NotificationCenterProps = {
  notifications: Array<NotificationsProps>;
};

const NotificationCenter = (props: NotificationCenterProps) => {
  const { removeNotificationWithId } = useNotificationContext();
  const previousNotifications = usePrevious(props.notifications);

  React.useEffect(() => {
    if (
      props.notifications &&
      previousNotifications &&
      props.notifications.length > 0 &&
      props.notifications.length > previousNotifications?.length
    ) {
      setTimeout(() => {
        removeNotificationWithId(
          props.notifications[props.notifications.length - 1].id
        );
      }, 5000);
    }
  }, [props.notifications]);

  return (
    <NotificationContainer>
      {props.notifications.map((notificationProps) => (
        <Notification
          key={_.uniqueId('notification-')}
          {...notificationProps}
        />
      ))}
    </NotificationContainer>
  );
};

export default NotificationCenter;
