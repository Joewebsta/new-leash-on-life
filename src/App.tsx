import { LoginForm } from "@/components/login-form";
import MatchPage from "@/components/match-page";
import { Search } from "@/components/search";
import { Dog } from "@/types/types";
import { useState } from "react";
import { Route, Routes } from "react-router";

function App() {
  const [selectedDogIds, setSelectedDogIds] = useState<Set<string>>(new Set());

  const handleUpdateSelectedDogIds = (dog: Dog) => {
    if (selectedDogIds.size >= 10 && !selectedDogIds.has(dog.id)) return;

    if (!selectedDogIds.has(dog.id)) {
      setSelectedDogIds(new Set([...selectedDogIds, dog.id]));
    } else {
      const newSet = new Set(selectedDogIds);
      newSet.delete(dog.id);
      setSelectedDogIds(newSet);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dogs/search"
          element={
            <Search
              selectedDogIds={selectedDogIds}
              onUpdateSelectedDogIds={handleUpdateSelectedDogIds}
            />
          }
        />
        <Route
          path="/dogs/match"
          element={<MatchPage selectedDogIds={selectedDogIds} />}
        />
      </Routes>
    </div>
  );
}

export default App;
