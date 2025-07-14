import { Button } from "@/components/ui/button";
import { usePerformLogout } from "@/services/authService";
import PulseLoader from "react-spinners/PulseLoader";

export function LogoutButton() {
  const { mutateAsync: logoutAsync, isPending: isLogoutPending } =
    usePerformLogout();

  return (
    <Button variant="ghost" onClick={async () => await logoutAsync()}>
      {isLogoutPending ? (
        <PulseLoader
          color="black"
          loading={isLogoutPending}
          size={6}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        "Logout"
      )}
    </Button>
  );
}
