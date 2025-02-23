import { Button } from "@/components/ui/button";
import { useIdentifyMatch } from "@/services/dogService";
import { Dog } from "@/types/types";
import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cake, MapPin } from "lucide-react";

export default function MatchPage({
  selectedDogs,
  onResetSelectedDogs,
}: {
  selectedDogs: Set<Dog>;
  onResetSelectedDogs: () => void;
}) {
  const navigate = useNavigate();

  const selectedDogsArr = useMemo(() => [...selectedDogs], [selectedDogs]);

  useEffect(() => {
    if (selectedDogsArr.length === 0) {
      navigate("/dogs/search?sort=breed:asc");
    }
  }, [selectedDogsArr, navigate]);

  const selectedDogIds = selectedDogsArr.map((dog) => dog.id);
  const {
    isPending: isLoadingMatch,
    isError: isMatchError,
    error: matchError,
    data: matchData,
  } = useIdentifyMatch(selectedDogIds, {
    enabled: selectedDogsArr.length > 0,
  });

  if (selectedDogsArr.length === 0) {
    return;
  }

  if (isMatchError) {
    return (
      <div>
        <h1>Error finding a match. Please try again.</h1>
      </div>
    );
  }

  if (isLoadingMatch) {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
  }

  const matchedDogId = matchData.match;
  const matchedDog = selectedDogsArr.find(
    (dog) => dog.id === matchedDogId
  ) as Dog;

  const handleNewSearch = () => {
    navigate("/dogs/search?sort=breed:asc");
    onResetSelectedDogs();
  };

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
            <img
              key={matchedDog.id}
              src={matchedDog.img}
              alt={matchedDog.name}
              className="rounded-xl mb-3 aspect-square object-cover w-full"
            />
            <div className="flex flex-col gap-[2px]">
              <p className="text-2xl font-bold">{matchedDog.name}</p>
              <p className="text-lg truncate">{matchedDog.breed}</p>
              <p className="flex gap-1 text-neutral-500">
                <Cake size={20} />
                <span>
                  {matchedDog.age < 1
                    ? "less than 1 year old"
                    : `${matchedDog.age} year${
                        matchedDog.age === 1 ? "" : "s"
                      } old`}
                </span>
              </p>
              <p className="flex gap-1 text-neutral-500">
                <MapPin size={20} />
                <span>Zipcode: {matchedDog.zip_code}</span>
              </p>
            </div>
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
