export default function ErrorFallback({ message, stack }) {
  return (
    <>
      <h1>Блин, ошибка!</h1>
      <br />
      <code>error.message: {message}</code>
      <br />
      <pre>error.stack: {stack}</pre>
    </>
  );
}
