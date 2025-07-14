import { PawPrint } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md">
        <PawPrint className="size-6" />
      </div>
      <h1 className="text-xl font-bold">Welcome to a New Leash on Life</h1>
    </div>
  );
}
