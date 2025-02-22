import { LoginForm } from "@/components/login-form";
import MatchPage from "@/components/match-page";
import { Search } from "@/components/search";
import { Dog } from "@/types/types";
import { useState } from "react";
import { Route, Routes } from "react-router";

function App() {
  const [selectedDogs, setSelectedDogs] = useState<Set<Dog>>(new Set());

  const handleUpdateSelectedDogs = (dog: Dog) => {
    if (selectedDogs.size >= 10 && !selectedDogs.has(dog)) return;

    if (!selectedDogs.has(dog)) {
      setSelectedDogs(new Set([...selectedDogs, dog]));
    } else {
      const newSet = new Set(selectedDogs);
      newSet.delete(dog);
      setSelectedDogs(newSet);
    }
  };

  const handleResetSelectedDogs = () => {
    setSelectedDogs(new Set());
  };

  return (
    <Routes>
      <Route index element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dogs/search"
        element={
          <Search
            selectedDogs={selectedDogs}
            onUpdateSelectedDogs={handleUpdateSelectedDogs}
          />
        }
      />
      <Route
        path="/dogs/match"
        element={
          <MatchPage
            selectedDogs={selectedDogs}
            onResetSelectedDogs={handleResetSelectedDogs}
          />
        }
      />
    </Routes>
  );
}

export default App;
