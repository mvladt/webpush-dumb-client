import { useEffect, useState } from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import NotificationForm from "./components/NotificationForm";
import WithAllApis from "./components/WithAllApis";
import WithPermission from "./components/WithPermission";
import WithPushSubscription from "./components/WithPushSubscription";
import WithServiceWorker from "./components/WithServiceWorker";
import { dumbUUID, urlBase64ToUint8Array } from "./tools";
import api from "./api";

import type { NotificationEntity } from "./types";

function App() {
  const [notification, setNotification] = useState<NotificationEntity>({
    id: "",
    datetime: "",
    payload: { text: "" },
  });

  const [options, setOptions] = useState<
    PushSubscriptionOptionsInit | undefined
  >();

  useEffect(() => {
    api.getKey().then((key) => {
      setOptions({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      });
    });
  }, []);

  const handleChange = (changing: NotificationEntity) => {
    setNotification(changing);
  };

  const handleSubmit = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      alert("Service Worker не зарегистрирован!");
      return;
    }

    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      alert("Нет подписки на push-уведомления!");
      return;
    }

    await api.schedule({
      id: dumbUUID(),
      ...notification,
      subscription: subscription.toJSON(),
    });

    setNotification({
      id: "",
      datetime: "",
      payload: { text: "" },
    });

    alert("Уведомление создано!");
  };

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <WithAllApis>
        <WithServiceWorker scriptURL="sw.js">
          <WithPermission>
            <WithPushSubscription options={options}>
              <NotificationForm
                notification={notification}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </WithPushSubscription>
          </WithPermission>
        </WithServiceWorker>
      </WithAllApis>
    </ErrorBoundary>
  );
}

export default App;
