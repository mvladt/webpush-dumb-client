# Клиент для Web Push уведомлений

[Демо](https://mvladt.github.io/webpush-dumb-client) | [Сервер-планировщик](https://github.com/mvladt/webpush-scheduler)

Элементарный клиент для планирования [Web Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) уведомлений. Позволяет пользователям запланировать браузерное уведомление, которое будет доставлено в указанное время через сервер-планировщик.

## Как это работает

1.  **Проверка поддержки**: Приложение проверяет доступность Notifications API, Push API и Service Worker в браузере.
2.  **Разрешение**: Запрашивает у пользователя разрешение на показ уведомлений.
3.  **Регистрация SW**: Регистрирует Service Worker (`sw.js`), который будет обрабатывать приходящие push-события.
4.  **Подписка**: Создаёт и сохраняет на сервере Push Subscription с использованием VAPID-ключей.
5.  **Планирование**: Пользователь вводит текст и время будущего уведомления.
6.  **Отправка**: Клиент отправляет данные на сервер-планировщик.
7.  **Доставка**: Сервер в заданное время отправляет уведомление через Web Push Protocol.
8.  **Показ**: Service Worker принимает push-событие и показывает уведомление.

## Технологический стек

- **Frontend**: Vite, React, TypeScript
- **API**: Web Push API, Service Worker API, Notifications API
- **Backend**: [Сервер-планировщик](https://github.com/mvladt/webpush-scheduler)

## API Endpoints

[Сервер-планировщик](https://github.com/mvladt/webpush-scheduler) можно как развернуть самостоятельно, так и использовать развернутый мной. Он доступен по адресу: `https://scheduler.push.mvladt.ru/api`.

---

_Это демонстрационный проект, показывающий полный цикл работы с Web Push Notifications._
