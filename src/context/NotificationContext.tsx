import React from 'react';
import type { NotificationsProps } from '../components/Notification';
import NotificationCenter from '../components/NotificationCenter';
import _ from 'lodash';

export type NotificationContextValues = {
  triggerNewNotification: (notificationProps: NotificationsProps) => void;
  removeEarliestNotification: () => void;
  removeNotificationWithId: (id: string) => void;
};

const NotificationContext = React.createContext<NotificationContextValues>({
  triggerNewNotification: () => {},
  removeEarliestNotification: () => {},
  removeNotificationWithId: () => {},
});

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = React.useState<
    Array<NotificationsProps>
  >([]);

  const triggerNewNotification = (notificationProps: NotificationsProps) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notificationProps,
        id: _.uniqueId('notificationId'),
      },
    ]);
  };

  const removeEarliestNotification = () => {
    setNotifications((prevNotifications) => {
      const [_, ...rest] = prevNotifications;
      return rest;
    });
  };

  const removeNotificationWithId = (id: string) => {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter((notification) => notification.id != id);
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        triggerNewNotification,
        removeEarliestNotification,
        removeNotificationWithId,
      }}
    >
      {children}
      <NotificationCenter notifications={notifications} />
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const {
    triggerNewNotification,
    removeEarliestNotification,
    removeNotificationWithId,
  } = React.useContext(NotificationContext);
  return {
    triggerNewNotification,
    removeEarliestNotification,
    removeNotificationWithId,
  };
};

export { NotificationProvider, useNotificationContext };
