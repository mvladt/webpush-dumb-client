import { useEffect, useState } from "react";

export default function WithServiceWorker({ children }) {
  const scriptURL = "sw.js";

  const [registration, setRegistration] = useState(null);
  const [fallback, setFallback] = useState(
    "Service Worker не зарегистрирован..."
  );

  useEffect(() => {
    if (window.ServiceWorker) {
      register(scriptURL, navigator.serviceWorker).then(setRegistration);
    } else {
      setFallback("Service Worker API не поддерживается...");
    }
  }, []);

  return <>{registration ? children : <p>{fallback}</p>}</>;
}

/**
 * @param {string | URL} scriptURL
 * @param {ServiceWorkerContainer} serviceWorkerContainer
 * @returns {Promise<ServiceWorkerRegistration>}
 */
async function register(scriptURL, serviceWorkerContainer) {
  console.log("Вызываем serviceWorkerContainer.register()...");

  const registration = await serviceWorkerContainer.register(scriptURL);
  return registration;
}
