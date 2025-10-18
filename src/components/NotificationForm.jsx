export default function NotificationForm({
  notification = { id: "", payload: { text: "" }, datetime: "" },
  onChange = (f) => f,
  onSubmit = (f) => f,
}) {
  const handleSubmit = (event) => {
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
            onChange={(event) =>
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
            onChange={(event) =>
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
        <button>Создать</button>
      </div>
    </form>
  );
}
