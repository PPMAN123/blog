import React from 'react';
import type { NotificationsProps } from '../components/Notification';
import NotificationCenter from '../components/NotificationCenter';

export type NotificationContextValues = {
  triggerNewNotification: (notificationProps: NotificationsProps) => void;
  removeEarliestNotification: () => void;
};

const NotificationContext = React.createContext<NotificationContextValues>({
  triggerNewNotification: () => {},
  removeEarliestNotification: () => {},
});

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = React.useState<
    Array<NotificationsProps>
  >([]);

  const triggerNewNotification = (notificationProps: NotificationsProps) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notificationProps,
    ]);
  };

  const removeEarliestNotification = () => {
    setNotifications((prevNotifications) => {
      const [_, ...rest] = prevNotifications;
      return rest;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        triggerNewNotification,
        removeEarliestNotification,
      }}
    >
      <NotificationCenter notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const { triggerNewNotification, removeEarliestNotification } =
    React.useContext(NotificationContext);
  return {
    triggerNewNotification,
    removeEarliestNotification,
  };
};

export { NotificationProvider, useNotificationContext };
