console.log("Вызван файл sw.js!");

self.addEventListener("push", (event) => {
  const registration = self.registration;
  const payload = event.data.json();
  const title = "Бу! испугался?";
  const options = { body: payload.text };

  console.log(`Push event! Payload: ${JSON.stringify(payload)}.`);

  event.waitUntil(registration.showNotification(title, options));
});
