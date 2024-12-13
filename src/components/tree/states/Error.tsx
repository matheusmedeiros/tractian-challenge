interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-red-600 font-medium mb-2">
        Ocorreu um erro ao carregar os dados
      </div>
      {message && (
        <div className="text-red-500 text-sm text-center">{message}</div>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100"
      >
        Tentar novamente
      </button>
    </div>
  );
}
