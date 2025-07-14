import { PawPrint } from "lucide-react";
import { Link } from "react-router";
import { LogoutButton } from "./logout-button";

export function AppHeader() {
  return (
    <div className="px-6 md:px-10 xl:px-20 border-b border-neutral-200">
      <header className="flex h-12 items-center justify-between">
        <Link to={"/dogs/search?sort=breed:asc"}>
          <div className="flex gap-2 items-center">
            <PawPrint size={20} />
            <h1 className="font-bold">A New Leash on Life</h1>
          </div>
        </Link>
        <LogoutButton />
      </header>
    </div>
  );
}
