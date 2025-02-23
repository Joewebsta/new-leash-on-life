import { Button } from "@/components/ui/button";
import { usePerformLogout } from "@/services/authService";
import { PawPrint } from "lucide-react";
import { Outlet } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";

export default function Layout() {
  const { mutateAsync: logoutAsync, isPending: isLogoutPending } =
    usePerformLogout();

  return (
    <div className="relative min-h-screen">
      <div className="px-6 md:px-10 xl:px-20 border-b border-neutral-200">
        <header className="flex h-12 items-center justify-between">
          <div className="flex gap-2 items-center">
            <PawPrint size={20} />
            <h1 className="font-bold">A New Leash on Life</h1>
          </div>
          <Button
            variant="ghost"
            onClick={async () => {
              try {
                await logoutAsync();
              } catch (error) {
                // JOE TODO: HOW TO HANDLE ERROR
              }
            }}
          >
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
        </header>
      </div>
      <Outlet />
    </div>
  );
}
