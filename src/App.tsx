import { LoginForm } from "@/components/login-form";
import { Search } from "@/components/search";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
