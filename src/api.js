const schedule = async (notification) => {
  await fetch("https://scheduler.push.mvladt.ru/api/notifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
};

const getKey = async () => {
  const response = await fetch("https://scheduler.push.mvladt.ru/api/key");
  const key = await response.text();

  if (!key) throw new Error("Сервер не прислал VAPID key :(");

  return key;
};

const api = {
  schedule,
  getKey,
};

export default api;
