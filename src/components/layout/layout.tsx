import { Outlet } from "react-router";
import { AppHeader } from "./app-header";

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AppHeader />
      <Outlet />
    </div>
  );
}
