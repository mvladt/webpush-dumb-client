import { useState } from "react";

export default function WithPermission({ children }) {
  const [permission, setPermission] = useState(Notification.permission);

  const handlePermissionRequest = () => {
    requestPermission(Notification).then(setPermission);
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

/**
 * @param {Notification} NotificationInterface
 * @returns {Promise<NotificationPermission>}
 */
async function requestPermission(NotificationInterface) {
  console.log("Вызываем Notification.requestPermission()...");

  const permission = await NotificationInterface.requestPermission();
  return permission;
}
