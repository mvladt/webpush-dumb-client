const schedule = async (notification) => {
  await fetch("/api/notifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
};

const getKey = async () => {
  const response = await fetch("/api/key");
  const key = await response.text();

  if (!key) throw new Error("Сервер не прислал VAPID key :(");

  return key;
};

const api = {
  schedule,
  getKey,
};

export default api;
