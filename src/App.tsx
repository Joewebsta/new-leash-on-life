import Layout from "@/components/layout";
import { LoginForm } from "@/components/login-form";
import MatchPage from "@/components/pages/match-page";
import NotFound from "@/components/pages/not-found";
import { SearchPage } from "@/components/pages/search-page";
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router";
import { useSelectedDogs } from "./hooks/useSelectedDogs";

function App() {
  const { selectedDogs, toggleDog, resetSelectedDogs } = useSelectedDogs();

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
