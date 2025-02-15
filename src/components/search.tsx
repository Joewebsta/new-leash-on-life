import { Button } from "@/components/ui/button";
import { usePerformLogout } from "@/services/authService";
import { useFetchDogs, useSearchDogs } from "@/services/dogService";

export function Search() {
  const { mutateAsync, isPending: isLogoutPending } = usePerformLogout();
  const {
    isPending: isLoadingSearchData,
    isError: isSearchError,
    data: searchData,
  } = useSearchDogs();

  const dogIds = searchData?.resultIds;

  const {
    isPending: isLoadingDogs,
    isError: isDogsError,
    data: dogsData,
  } = useFetchDogs(dogIds ?? []);

  if (isLoadingSearchData && isLoadingDogs) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <div>SEARCH PAGE</div>
      {dogsData?.map((dog) => {
        return (
          <img
            src={dog.img}
            alt={dog.name}
            style={{
              aspectRatio: "1 / 1",
              objectFit: "cover",
              width: "200px",
              height: "200px",
            }}
          />
        );
      })}
      <Button
        onClick={async () => {
          try {
            await mutateAsync();
          } catch (error) {}
        }}
      >
        {isLogoutPending ? "PENDING" : "Logout"}
      </Button>
    </div>
  );
}
