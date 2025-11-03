import type { NotificationEntity } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

const schedule = async (notification: NotificationEntity): Promise<void> => {
  await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  });
};

const getKey = async (): Promise<string> => {
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
