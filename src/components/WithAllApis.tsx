import type { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export default function WithAllApis({ children }: Props) {
  const isNotificationsApiAvailable = Boolean(window.Notification);
  const isPushApiAvailable = Boolean(window.PushManager);
  const isServiceWorkerApiAvailable = Boolean(window.ServiceWorker);

  const isAllApisAvailable =
    isNotificationsApiAvailable &&
    isPushApiAvailable &&
    isServiceWorkerApiAvailable;

  const fallback = (
    <div>
      <h2>Нет пути</h2>
      <p>На вашем устройстве не поддерживаются необходимые API:</p>
      <ul>
        {!isNotificationsApiAvailable && <li>Notifications API</li>}
        {!isPushApiAvailable && <li>Push API</li>}
        {!isServiceWorkerApiAvailable && <li>Service Worker API</li>}
      </ul>
    </div>
  );

  return <>{isAllApisAvailable ? children : fallback}</>;
}
