import { useState } from "react";
import Home from "./pages/Home.tsx";
import ToonHub from "./views/ToonHub/ToonHub.tsx";
import FoldCraft from "./views/FoldCraft/FoldCraft.tsx";
import JackPortfolio from "./views/JackPortfolio/JackPortfolio.tsx";
import Portfolio from "./views/Portfolio/Portfolio.tsx";

type Page = "home" | "toonhub" | "foldcraft" | "jack" | "portfolio";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (path: string) => {
    if (path === "/toonhub") setPage("toonhub");
    else if (path === "/foldcraft") setPage("foldcraft");
    else if (path === "/jack") setPage("jack");
    else if (path === "/portfolio") setPage("portfolio");
    else setPage("home");
  };

  const goBack = () => setPage("home");

  return (
    <>
      {page === "home" && <Home onNavigate={navigate} />}
      {page === "toonhub" && <ToonHub onBack={goBack} />}
      {page === "foldcraft" && <FoldCraft />}
      {page === "jack" && <JackPortfolio />}
      {page === "portfolio" && <Portfolio />}
    </>
  );
}
