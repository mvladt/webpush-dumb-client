import React, { ChangeEvent, FormEvent } from "react";

import type { NotificationEntity } from "../types";

type Props = {
  notification?: NotificationEntity;
  onChange?: (notification: NotificationEntity) => void;
  onSubmit?: (notification: NotificationEntity) => void;
};

export default function NotificationForm({
  notification = { id: "", payload: { text: "" }, datetime: "" },
  onChange = () => {},
  onSubmit = () => {},
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(notification);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Notification</h2>

      <div>
        <label>
          Текст уведомления
          <input
            type="text"
            value={notification.payload.text}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange({
                ...notification,
                payload: { ...notification.payload, text: event.target.value },
              })
            }
            required
          />
        </label>
      </div>
      <div>
        <label>
          Время уведомления
          <input
            type="datetime-local"
            value={notification.datetime}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange({
                ...notification,
                datetime: event.target.value,
              })
            }
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Создать</button>
      </div>
    </form>
  );
}
