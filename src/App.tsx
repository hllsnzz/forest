import { useState } from "react";
import Home from "./pages/Home.tsx";
import ToonHub from "./views/ToonHub.tsx";
import FoldCraft from "./views/FoldCraft.tsx";

type Page = "home" | "toonhub" | "foldcraft";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (path: string) => {
    if (path === "/toonhub") setPage("toonhub");
    else if (path === "/foldcraft") setPage("foldcraft");
    else setPage("home");
  };

  const goBack = () => setPage("home");

  return (
    <>
      {page === "home" && <Home onNavigate={navigate} />}
      {page === "toonhub" && <ToonHub onBack={goBack} />}
      {page === "foldcraft" && <FoldCraft />}
    </>
  );
}
