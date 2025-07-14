import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";

interface FormActionsProps {
  onReset: () => void;
  isLoading: boolean;
  resultsTotal: number;
}

export function FormActions({
  onReset,
  isLoading,
  resultsTotal,
}: FormActionsProps) {
  const renderPrimaryButtonText = (resultsTotal: number) => {
    if (resultsTotal === 0) return "No dogs found";
    if (resultsTotal > 1000) return "Show 1000+ dogs";
    return `Show ${resultsTotal.toLocaleString()} dog${
      resultsTotal === 1 ? "" : "s"
    }`;
  };

  return (
    <div className="fixed flex gap-2 bottom-0 inset-x-0 p-4 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <Button
        className="w-1/2"
        variant="secondary"
        type="button"
        onClick={onReset}
      >
        Reset
      </Button>
      <Button className="w-1/2" type="submit" disabled={resultsTotal === 0}>
        {isLoading ? (
          <PulseLoader
            color="white"
            loading={isLoading}
            size={8}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          renderPrimaryButtonText(resultsTotal)
        )}
      </Button>
    </div>
  );
}
