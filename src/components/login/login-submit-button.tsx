import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";

interface LoginSubmitButtonProps {
  isPending: boolean;
  disabled?: boolean;
}

export function LoginSubmitButton({
  isPending,
  disabled,
}: LoginSubmitButtonProps) {
  return (
    <Button className="w-full" type="submit" disabled={isPending || disabled}>
      {isPending ? (
        <PulseLoader
          color="white"
          loading={isPending}
          size={8}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        "Login"
      )}
    </Button>
  );
}
