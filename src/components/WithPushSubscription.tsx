import { useState, useEffect, ReactNode } from "react";

export type Props = {
  options: PushSubscriptionOptionsInit;
  children: ReactNode;
};

export default function WithPushSubscription({ children, options }: Props) {
  const [subscription, setSubscription] = useState<
    PushSubscription | undefined
  >();

  useEffect(() => {
    if (options) {
      navigator.serviceWorker.getRegistration().then(async (registration) => {
        const subscription =
          (await registration.pushManager.getSubscription()) ??
          (await registration.pushManager.subscribe(options));

        setSubscription(subscription);
      });
    }
  }, [options]);

  const fallback = (
    <>
      <h2>Что-то с PushSubscription</h2>
      <p>Надо подождать, пока загрузится.</p>
      <p>Ну или что-то пошло не так.</p>
    </>
  );

  return <>{subscription ? children : fallback}</>;
}
