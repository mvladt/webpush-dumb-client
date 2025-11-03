import { useEffect, useState, ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export default function WithServiceWorker({ children }: Props) {
  const scriptURL = "sw.js";

  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [fallback, setFallback] = useState<string>(
    "Service Worker не зарегистрирован..."
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(scriptURL).then(setRegistration);
    } else {
      setFallback("Service Worker API не поддерживается...");
    }
  }, []);

  return <>{registration ? children : <p>{fallback}</p>}</>;
}
