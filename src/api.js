const API_URL = import.meta.env.VITE_API_URL;

const schedule = async (notification) => {
  await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
};

const getKey = async () => {
  const response = await fetch(`${API_URL}/key`);
  const key = await response.text();

  if (!key) throw new Error("Сервер не прислал VAPID key :(");

  return key;
};

const api = {
  schedule,
  getKey,
};

export default api;
