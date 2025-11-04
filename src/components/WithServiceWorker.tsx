import { useEffect, useState, ReactNode } from "react";

export type Props = {
  scriptURL?: string;
  children: ReactNode;
};

export default function WithServiceWorker({
  children,
  scriptURL = "sw.js",
}: Props) {
  const [registration, setRegistration] = useState<
    ServiceWorkerRegistration | undefined
  >();

  const fallback = (
    <div>
      <h2>Что-то с ServiceWorker</h2>
      <p>Похоже он не зарегистрирован.</p>
    </div>
  );

  useEffect(() => {
    navigator.serviceWorker.register(scriptURL).then(setRegistration);
  }, []);

  return <>{registration ? children : fallback}</>;
}
