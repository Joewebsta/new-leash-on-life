interface LoginErrorMessageProps {
  isError: boolean;
  errorMessage?: string;
}

export function LoginErrorMessage({
  isError,
  errorMessage,
}: LoginErrorMessageProps) {
  if (!isError) return null;

  return (
    <div className="text-sm text-red-500 text-center mt-2 p-2 bg-red-50 rounded-md border border-red-200">
      {errorMessage ||
        "We're having trouble logging you in. Please try again later."}
    </div>
  );
}
