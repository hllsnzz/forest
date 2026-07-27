/**
 * ShapeGridPage �?React Bits ShapeGrid interactive showcase
 * Fullscreen Canvas grid with top navigation + control panel
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShapeGrid from "./ShapeGrid.tsx";

type Shape = "square" | "hexagon" | "circle" | "triangle";
type Direction = "diagonal" | "up" | "right" | "down" | "left";

var SHAPE_OPTIONS = ["square", "hexagon", "circle", "triangle"];
var DIRECTION_OPTIONS = ["right", "left", "up", "down", "diagonal"];

export default function ShapeGridPage() {
  const navigate = useNavigate();
  const [shape, setShape] = useState<Shape>("hexagon");
  const [direction, setDirection] = useState<Direction>("diagonal");
  const [speed, setSpeed] = useState(1);
  const [squareSize, setSquareSize] = useState(50);
  const [hoverFillColor, setHoverFillColor] = useState("#d6ff66");
  const [borderColor, setBorderColor] = useState("rgba(255,255,255,0.15)");
  const [hoverTrailAmount, setHoverTrailAmount] = useState(8);
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ShapeGrid
          speed={speed} squareSize={squareSize} direction={direction}
          borderColor={borderColor} hoverFillColor={hoverFillColor}
          shape={shape} hoverTrailAmount={hoverTrailAmount}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>&larr; Back</button>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>ShapeGrid �?React Bits</h1>
        <button onClick={() => setPanelOpen(!panelOpen)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>{panelOpen ? "Hide Controls" : "Show Controls"}</button>
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10, textAlign: "center", pointerEvents: "none" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>React Bits</h2>
        <p style={{ margin: "8px 0 0", fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(255,255,255,0.6)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>Interactive ShapeGrid �?hover the grid to see the effect</p>
      </div>
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 20, transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", opacity: panelOpen ? 1 : 0, pointerEvents: panelOpen ? "all" : "none" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", background: "rgba(20,20,20,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 24px", maxWidth: "calc(100vw - 48px)" }}>
          <ControlGroup label="Shape"><SegControl options={SHAPE_OPTIONS} value={shape} onChange={(v: string) => setShape(v as Shape)} /></ControlGroup>
          <ControlGroup label="Direction"><SegControl options={DIRECTION_OPTIONS} value={direction} onChange={(v: string) => setDirection(v as Direction)} /></ControlGroup>
          <ControlGroup label={'Speed ' + speed.toFixed(1)}><input type="range" min={0.1} max={5} step={0.1} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#d6ff66" }} /></ControlGroup>
          <ControlGroup label={'Size ' + squareSize}><input type="range" min={16} max={120} step={2} value={squareSize} onChange={(e) => setSquareSize(parseInt(e.target.value))} style={{ width: 80, accentColor: "#d6ff66" }} /></ControlGroup>
          <ControlGroup label={'Trail ' + hoverTrailAmount}><input type="range" min={0} max={20} step={1} value={hoverTrailAmount} onChange={(e) => setHoverTrailAmount(parseInt(e.target.value))} style={{ width: 80, accentColor: "#d6ff66" }} /></ControlGroup>
        </div>
      </div>
    </div>
  );
}

function ControlGroup(props: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{props.label}</span>
      {props.children}
    </div>
  );
}

function SegControl(props: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: 2 }}>
      {props.options.map(function(opt: string) { return (
        <button key={opt} onClick={function() { props.onChange(opt); }} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 500, fontFamily: "inherit", border: "none", borderRadius: 4, cursor: "pointer", background: opt === props.value ? "rgba(214,255,102,0.2)" : "transparent", color: opt === props.value ? "#d6ff66" : "rgba(255,255,255,0.5)", transition: "all 0.2s ease", whiteSpace: "nowrap" }}>{opt}</button>
      ); })}
    </div>
  );
}
