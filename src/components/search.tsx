import { Button } from "@/components/ui/button";
import { usePerformLogout } from "@/services/authService";
import { performSearch } from "@/api/dogs";

export function Search() {
  const { mutateAsync, isPending } = usePerformLogout();

  return (
    <div>
      <div>SEARCH PAGE</div>
      <Button
        onClick={async () => {
          try {
            await performSearch();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Perform search
      </Button>
      <Button
        onClick={async () => {
          try {
            await mutateAsync();
          } catch (error) {}
        }}
      >
        {isPending ? "PENDING" : "Logout"}
      </Button>
    </div>
  );
}
