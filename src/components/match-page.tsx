import { Button } from "@/components/ui/button";
import { useIdentifyMatch } from "@/services/dogService";
import { Dog } from "@/types/types";
import { useNavigate } from "react-router";

export default function MatchPage({
  selectedDogs,
  onResetSelectedDogs,
}: {
  selectedDogs: Set<Dog>;
  onResetSelectedDogs: () => void;
}) {
  const navigate = useNavigate();

  const selectedDogsArr = [...selectedDogs];
  const selectedDogIds = selectedDogsArr.map((dog) => dog.id);

  const {
    isPending: isLoadingMatch,
    isError: isMatchError,
    error: matchError,
    data: matchData,
  } = useIdentifyMatch(selectedDogIds);

  if (isLoadingMatch || !matchData) {
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
    <div>
      <h1>MATCH PAGE!</h1>
      <div key={matchedDog.id}>
        <img
          key={matchedDog.id}
          src={matchedDog.img}
          alt={matchedDog.name}
          style={{
            aspectRatio: "1 / 1",
            objectFit: "cover",
            width: "200px",
            height: "200px",
          }}
        />
        <p>{matchedDog.name}</p>
        <p>{matchedDog.breed}</p>
        <p>{matchedDog.age}</p>
        <p>{matchedDog.zip_code}</p>
      </div>
      <Button onClick={handleNewSearch}>Search Again</Button>
    </div>
  );
}
