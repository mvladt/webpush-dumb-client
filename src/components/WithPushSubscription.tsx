import { useState, useEffect, ReactNode } from "react";
import { urlBase64ToUint8Array } from "../tools";
import api from "../api";

export type Props = {
  children: ReactNode;
};

export default function WithPushSubscription({ children }: Props) {
  const fallback = "Не получена PushSubscription...";

  const [subscription, setSubscription] = useState<
    PushSubscription | undefined
  >();

  const asyncEffect = async () => {
    const key = await api.getKey();
    const options: PushSubscriptionOptionsInit = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    };
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription =
      (await registration.pushManager.getSubscription()) ??
      (await registration.pushManager.subscribe(options));

    setSubscription(subscription);
  };

  useEffect(() => {
    asyncEffect();
  }, []);

  return <>{subscription ? children : fallback}</>;
}
