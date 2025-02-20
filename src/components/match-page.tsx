import { useIdentifyMatch } from "@/services/dogService";

export default function MatchPage({
  selectedDogIds,
}: {
  selectedDogIds: Set<string>;
}) {
  const {
    isPending: isLoadingMatch,
    isError: isMatchError,
    data: match,
  } = useIdentifyMatch([...selectedDogIds]);

  console.log("MATCH: ", match);

  return (
    <div>
      <h1>MATCH PAGE!</h1>
    </div>
  );
}
