export type NotificationPayload = {
  text: string;
};

export type NotificationEntity = {
  id: string;
  datetime: string;
  payload: NotificationPayload;
  subscription?: PushSubscriptionJSON;
};
