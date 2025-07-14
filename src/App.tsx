import Layout from "@/components/layout/layout";
import { LoginPage } from "@/components/login-page";
import MatchPage from "@/components/match-page";
import NotFoundPage from "@/components/not-found-page";
import { SearchPage } from "@/components/search-page";
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router";
import { useSelectedDogs } from "./hooks/useSelectedDogs";

function App() {
  const { selectedDogs, toggleDog, resetSelectedDogs } = useSelectedDogs();

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route
            path="/dogs/search"
            element={
              <SearchPage
                selectedDogs={Array.from(selectedDogs)}
                onUpdateSelectedDogs={toggleDog}
              />
            }
          />
          <Route
            path="/dogs/match"
            element={
              <MatchPage
                selectedDogs={Array.from(selectedDogs)}
                onResetSelectedDogs={resetSelectedDogs}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
