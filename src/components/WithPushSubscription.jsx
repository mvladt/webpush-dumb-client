import { useState, useEffect } from "react";
import { urlBase64ToUint8Array } from "../tools.js";
import api from "../api.js";

export default function WithPushSubscription({ children }) {
  const fallback = "Не получена PushSubscription...";

  const [subscription, setSubscription] = useState();

  const asyncEffect = async () => {
    const key = await api.getKey();
    const options = {
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
