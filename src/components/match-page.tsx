import { DogContent } from "@/components/dogs/dog-content";
import { LoadingSpinner } from "@/components/states/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIdentifyMatch } from "@/services/dogService";
import { Dog } from "@/types/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function MatchPage({
  selectedDogs,
  onResetSelectedDogs,
}: {
  selectedDogs: Dog[];
  onResetSelectedDogs: () => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDogs.length === 0) {
      navigate("/dogs/search?sort=breed:asc");
    }
  }, [selectedDogs, navigate]);

  const selectedDogIds = selectedDogs.map((dog) => dog.id);
  const {
    isPending: isLoadingMatch,
    isError: isMatchError,
    data: matchData,
  } = useIdentifyMatch(selectedDogIds, {
    enabled: selectedDogs.length > 0,
  });

  if (selectedDogs.length === 0) {
    return;
  }

  const handleNewSearch = () => {
    navigate("/dogs/search?sort=breed:asc");
    onResetSelectedDogs();
  };

  if (isMatchError) {
    return (
      <div className="px-6 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col gap-6">
          <h1 className="text-red-600 font-medium text-center">
            Error finding a match
          </h1>
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleNewSearch}
          >
            Return to Search
          </Button>
        </div>
      </div>
    );
  }

  if (isLoadingMatch) {
    return <LoadingSpinner loading={isLoadingMatch} />;
  }

  const matchedDogId = matchData.match;
  const matchedDog = selectedDogs.find(
    (dog: Dog) => dog.id === matchedDogId
  ) as Dog;

  return (
    <div className="px-6 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <h1 className="text-xl text-center font-bold">
          🎉 Congratulations! 🎉
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>You've matched with {matchedDog.name}.</CardTitle>
          </CardHeader>
          <CardContent>
            <DogContent dog={matchedDog} />
          </CardContent>
        </Card>
        <div className="w-full">
          <Button className="w-full" onClick={handleNewSearch}>
            Search Again
          </Button>
        </div>
      </div>
    </div>
  );
}
