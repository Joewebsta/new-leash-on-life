import Layout from "@/components/layout";
import { LoginForm } from "@/components/login-form";
import MatchPage from "@/components/match-page";
import { SearchPage } from "@/components/search-page";
import { Dog } from "@/types/types";
import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import { Route, Routes } from "react-router";

const MAX_SELECTED_DOGS = 100;

function App() {
  const [selectedDogs, setSelectedDogs] = useState<Set<Dog>>(new Set());

  const handleUpdateSelectedDogs = (dog: Dog) => {
    if (selectedDogs.size >= MAX_SELECTED_DOGS && !selectedDogs.has(dog))
      return;

    if (selectedDogs.has(dog)) {
      const newSet = new Set(selectedDogs);
      newSet.delete(dog);
      setSelectedDogs(newSet);
    } else {
      setSelectedDogs(new Set([...selectedDogs, dog]));
    }
  };

  const handleResetSelectedDogs = () => setSelectedDogs(new Set());

  return (
    <>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<Layout />}>
          <Route
            path="/dogs/search"
            element={
              <SearchPage
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
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
