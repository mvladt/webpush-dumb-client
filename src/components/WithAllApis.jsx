export default function WithAllApi({ children }) {
  const isNotificationsApiAvailable = Boolean(window.Notification);
  const isPushApiAvailable = Boolean(window.PushManager);
  const isServiceWorkerApiAvailable = Boolean(window.ServiceWorker);

  const isAllApiAvailable =
    isNotificationsApiAvailable &&
    isPushApiAvailable &&
    isServiceWorkerApiAvailable;

  const fallback =
    "Необходимые API не поддерживаются..." +
    `А именно — 
      ${isNotificationsApiAvailable ? "Notifications API;" : ""} 
      ${isPushApiAvailable ? "Push API;" : ""} 
      ${isServiceWorkerApiAvailable ? "Service Worker API;" : ""}
    `;

  return <>{isAllApiAvailable ? children : fallback}</>;
}
