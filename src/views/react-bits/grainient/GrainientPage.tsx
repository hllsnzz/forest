/**
 * GrainientPage — React Bits Grainient 交互展示页
 * 全屏 WebGL 渐变动画 + 属性控制面板
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grainient from "./Grainient.tsx";

export default function GrainientPage() {
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(true);

  // 颜色预设
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#06B6D4");
  const [color3, setColor3] = useState("#7C3AED");

  // 动画控制
  const [timeSpeed, setTimeSpeed] = useState(2.3);
  const [warpStrength, setWarpStrength] = useState(1.0);
  const [grainAmount, setGrainAmount] = useState(0.1);
  const [zoom, setZoom] = useState(0.9);
  const [contrast, setContrast] = useState(1.5);
  const [saturation, setSaturation] = useState(1.0);

  const [grainAnimated, setGrainAnimated] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", fontFamily: "'Inter', sans-serif" }}>
      {/* Grainient WebGL 背景 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Grainient
          color1={color1} color2={color2} color3={color3}
          timeSpeed={timeSpeed} warpStrength={warpStrength}
          grainAmount={grainAmount} zoom={zoom}
          contrast={contrast} saturation={saturation}
          grainAnimated={grainAnimated}
        />
      </div>

      {/* 顶部导航 */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>&larr; Back</button>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>Grainient — React Bits</h1>
        <button onClick={() => setPanelOpen(!panelOpen)} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>{panelOpen ? "Hide Controls" : "Show Controls"}</button>
      </div>

      {/* 中央标题 */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10, textAlign: "center", pointerEvents: "none" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
          Dynamic Gradient
        </h2>
        <p style={{ margin: "8px 0 0", fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(255,255,255,0.7)", textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>
          WebGL-powered real-time animated gradient
        </p>
      </div>

      {/* 控制面板 */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 20,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: panelOpen ? 1 : 0,
        pointerEvents: panelOpen ? "all" : "none",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 24px", maxWidth: "calc(100vw - 48px)" }}>

          {/* 颜色预览 */}
          <CtrlGroup label="Color 1">
            <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: 32, height: 32, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 6, cursor: "pointer", background: "none", padding: 0 }} />
          </CtrlGroup>
          <CtrlGroup label="Color 2">
            <input type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ width: 32, height: 32, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 6, cursor: "pointer", background: "none", padding: 0 }} />
          </CtrlGroup>
          <CtrlGroup label="Color 3">
            <input type="color" value={color3} onChange={e => setColor3(e.target.value)} style={{ width: 32, height: 32, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 6, cursor: "pointer", background: "none", padding: 0 }} />
          </CtrlGroup>

          {/* 滑块 */}
          <CtrlGroup label={"Speed " + timeSpeed.toFixed(1)}>
            <input type="range" min={0} max={5} step={0.1} value={timeSpeed} onChange={e => setTimeSpeed(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#fff" }} />
          </CtrlGroup>
          <CtrlGroup label={"Warp " + warpStrength.toFixed(1)}>
            <input type="range" min={0} max={3} step={0.1} value={warpStrength} onChange={e => setWarpStrength(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#fff" }} />
          </CtrlGroup>
          <CtrlGroup label={"Grain " + grainAmount.toFixed(2)}>
            <input type="range" min={0} max={0.5} step={0.01} value={grainAmount} onChange={e => setGrainAmount(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#fff" }} />
          </CtrlGroup>
          <CtrlGroup label={"Zoom " + zoom.toFixed(1)}>
            <input type="range" min={0.3} max={2} step={0.1} value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#fff" }} />
          </CtrlGroup>
          <CtrlGroup label={"Contrast " + contrast.toFixed(1)}>
            <input type="range" min={0.5} max={3} step={0.1} value={contrast} onChange={e => setContrast(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#fff" }} />
          </CtrlGroup>
          <CtrlGroup label={"Sat " + saturation.toFixed(1)}>
            <input type="range" min={0} max={2} step={0.1} value={saturation} onChange={e => setSaturation(parseFloat(e.target.value))} style={{ width: 80, accentColor: "#fff" }} />
          </CtrlGroup>

          {/* Grain Animated 开关 */}
          <CtrlGroup label="AnimGrain">
            <button onClick={() => setGrainAnimated(!grainAnimated)} style={{ width: 32, height: 32, borderRadius: 6, border: "2px solid rgba(255,255,255,0.2)", background: grainAnimated ? "rgba(255,255,255,0.25)" : "transparent", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{grainAnimated ? "ON" : "OFF"}</button>
          </CtrlGroup>
        </div>
      </div>
    </div>
  );
}

function CtrlGroup(props: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{props.label}</span>
      {props.children}
    </div>
  );
}
