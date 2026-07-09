import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ToonHub from "./views/ToonHub/ToonHub.tsx";
import FoldCraft from "./views/FoldCraft/FoldCraft.tsx";
import JackPortfolio from "./views/JackPortfolio/JackPortfolio.tsx";
import Portfolio from "./views/Portfolio/Portfolio.tsx";
import ViktorOddy from "./views/ViktorOddy/ViktorOddy.tsx";
import Lithos from "./views/Lithos/Lithos.tsx";
import SynapseX from "./views/SynapseX/SynapseX.tsx";
import Prisma from "./views/Prisma/Prisma.tsx";
import RIVR from "./views/RIVR/RIVR.tsx";
import Mainframe from "./views/Mainframe/Mainframe.tsx";
import Marketeam from "./views/Marketeam/Marketeam.tsx";
import CozyPaws from "./views/CozyPaws/CozyPaws.tsx";
import NHM from "./views/NHM/NHM.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/toonhub" element={<ToonHub />} />
      <Route path="/foldcraft" element={<FoldCraft />} />
      <Route path="/jack" element={<JackPortfolio />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/viktor" element={<ViktorOddy />} />
      <Route path="/lithos" element={<Lithos />} />
      <Route path="/synapse" element={<SynapseX />} />
      <Route path="/prisma" element={<Prisma />} />
      <Route path="/rivr" element={<RIVR />} />
      <Route path="/mainframe" element={<Mainframe />} />
      <Route path="/marketeam" element={<Marketeam />} />
      <Route path="/cozypaws" element={<CozyPaws />} />
      <Route path="/nhm" element={<NHM />} />
    </Routes>
  );
}
