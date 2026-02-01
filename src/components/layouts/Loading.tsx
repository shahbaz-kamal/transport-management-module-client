const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
      </div>
    </div>
  );
};

export default Loading;
