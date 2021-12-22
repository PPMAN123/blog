import React from 'react';
import type { NotificationsProps } from '../components/Notification';
import NotificationCenter from '../components/NotificationCenter';
import _ from 'lodash';

export type NotificationContextValues = {
  triggerNewNotification: (notificationProps: NotificationsProps) => void;
  removeEarliestNotification: () => void;
  removeNotificationWithId: (id: string) => void;
  addTimeOutStatus: (notificationId: string) => void;
  notificationTimeoutStatus: { [notificationId: string]: NodeJS.Timeout };
  removeTimeOutStatus: (
    notificationId: string,
    timeoutId: NodeJS.Timeout
  ) => void;
  notificationExitStatus: { [notificationId: string]: boolean };
};

const NotificationContext = React.createContext<NotificationContextValues>({
  triggerNewNotification: () => {},
  removeEarliestNotification: () => {},
  removeNotificationWithId: () => {},
  addTimeOutStatus: () => {},
  notificationTimeoutStatus: {},
  removeTimeOutStatus: () => {},
  notificationExitStatus: {},
});

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = React.useState<
    Array<NotificationsProps>
  >([]);

  const [notificationTimeoutStatus, setNotificationTimeoutStatus] =
    React.useState<{ [notificationId: string]: NodeJS.Timeout }>({});

  const [notificationExitStatus, setNotificationExitStatus] = React.useState<{
    [notificationId: string]: boolean;
  }>({});

  const addTimeOutStatus = (notificationId: string) => {
    const timeOut = setTimeout(() => {
      removeNotificationWithId(notificationId);
      removeTimeOutStatus(notificationId);
    }, 2500);
    console.log(notificationId, 'adding timeout', timeOut);

    setNotificationTimeoutStatus((prevNotificationTimeoutStatus) => ({
      ...prevNotificationTimeoutStatus,
      [notificationId]: timeOut,
    }));
  };

  const removeTimeOutStatus = (
    notificationId: string,
    timeoutId?: NodeJS.Timeout
  ) => {
    setNotificationTimeoutStatus((prevNotificationTimeoutStatus) => {
      const { [notificationId]: _, ...remainingTimeoutStatuses } =
        prevNotificationTimeoutStatus;
      return remainingTimeoutStatuses;
    });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

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
    setNotificationExitStatus((prevNotificationExitStatus) => ({
      ...prevNotificationExitStatus,
      [id]: true,
    }));
    setTimeout(() => {
      setNotifications((prevNotifications) => {
        return prevNotifications.filter(
          (notification) => notification.id != id
        );
      });
    }, 600);
  };

  return (
    <NotificationContext.Provider
      value={{
        triggerNewNotification,
        removeEarliestNotification,
        removeNotificationWithId,
        addTimeOutStatus,
        notificationTimeoutStatus,
        removeTimeOutStatus,
        notificationExitStatus,
      }}
    >
      {children}
      <NotificationCenter notifications={notifications} />
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  return React.useContext(NotificationContext);
};

export { NotificationProvider, useNotificationContext };
