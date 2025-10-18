import { useState } from "react";

import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ErrorFallback from "./components/ErrorFallback.jsx";
import NotificationForm from "./components/NotificationForm.jsx";
import WithAllApis from "./components/WithAllApis.jsx";
import WithPermission from "./components/WithPermission.jsx";
import WithPushSubscription from "./components/WithPushSubscription.jsx";
import WithServiceWorker from "./components/WithServiceWorker.jsx";
import { dumbUUID } from "./tools.js";
import api from "./api.js";

function App() {
  const [notification, setNotification] = useState({
    datetime: "",
    payload: { text: "" },
  });

  const handleChange = (changing) => {
    setNotification(changing);
  };

  const handleSubmit = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration.pushManager.getSubscription();

    await api.schedule({
      id: dumbUUID(),
      ...notification,
      subscription: subscription.toJSON(),
    });
  };

  return (
    <>
      <ErrorBoundary fallback={ErrorFallback}>
        <WithAllApis>
          <WithServiceWorker>
            <WithPermission>
              <WithPushSubscription>
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
    </>
  );
}

export default App;
