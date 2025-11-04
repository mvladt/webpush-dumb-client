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

  const fallback = (
    <>
      {permission === "denied" ? (
        <>
          <h2>Что-то с разрешением на уведомления</h2>
          <p>
            Похоже для <a href=".">{window.location.origin}</a> уведомления
            запрещены.
          </p>
          <p>Снять запрет можно в настройках браузера.</p>
        </>
      ) : (
        <button onClick={handlePermissionRequest}>
          Дать разрешение на уведомления
        </button>
      )}
    </>
  );

  return <>{permission === "granted" ? children : fallback}</>;
}
