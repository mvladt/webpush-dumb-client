import { useState, ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export default function WithPermission({ children }: Props) {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission
  );

  const handlePermissionRequest = () => {
    Notification.requestPermission().then(setPermission);
  };

  return (
    <>
      {permission === "granted" ? (
        children
      ) : permission === "denied" ? (
        `Блин, похоже для ${window.location.origin} установлен запрет на уведомления. Снять можно в настройках браузера.`
      ) : (
        <button onClick={handlePermissionRequest}>
          Дать разрешение на уведомления
        </button>
      )}
    </>
  );
}
