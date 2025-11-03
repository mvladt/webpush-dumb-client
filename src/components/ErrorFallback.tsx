type Props = {
  message?: string;
  stack?: string;
};

export default function ErrorFallback({ message, stack }: Props) {
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
