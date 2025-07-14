import PulseLoader from "react-spinners/PulseLoader";

interface LoadingSpinnerProps {
  loading: boolean;
}

export function LoadingSpinner({ loading }: LoadingSpinnerProps) {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <PulseLoader
        color="#2563eb"
        loading={loading}
        size={12}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
