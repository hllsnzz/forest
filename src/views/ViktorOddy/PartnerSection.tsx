import { useRef, useState, useEffect, useCallback } from "react";
import Button from "./Button";

const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
];

interface GifSprite {
  id: number;
  x: number;
  y: number;
  rotation: number;
  src: string;
}

export default function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sprites, setSprites] = useState<GifSprite[]>([]);
  const lastSpawn = useRef(0);
  const idCounter = useRef(0);

  const spawnGif = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;
    const id = idCounter.current++;
    const src = MARQUEE_IMAGES[Math.floor(Math.random() * MARQUEE_IMAGES.length)];
    const rotation = Math.random() * 20 - 10;
    setSprites((prev) => [...prev, { id, x, y, rotation, src }]);
    setTimeout(() => {
      setSprites((prev) => prev.filter((s) => s.id !== id));
    }, 1000);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      spawnGif(e.clientX - rect.left, e.clientY - rect.top);
    },
    [spawnGif]
  );

  return (
    <section className="w-full py-12 px-6">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] flex flex-col items-center justify-center"
        style={{
          minHeight: 400,
          padding: "6rem 2rem",
          background: "white",
          boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
        }}
      >
        {sprites.map((s) => (
          <img
            key={s.id}
            src={s.src}
            alt=""
            className="absolute pointer-events-none"
            style={{
              width: 120,
              height: 80,
              objectFit: "cover",
              borderRadius: 12,
              left: s.x - 60,
              top: s.y - 40,
              transform: `rotate(${s.rotation}deg) scale(1)`,
              opacity: 1,
              animation: "fadeInUp 0.8s ease-out reverse forwards",
              zIndex: 10,
            }}
          />
        ))}

        <h2
          className="font-mondwest text-[48px] md:text-[64px] lg:text-[80px] text-center leading-[1.1] tracking-tight mb-12"
          style={{ color: "#0D212C" }}
        >
          Partner with us
        </h2>
        <div className="flex items-center gap-3">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80"
            alt="Viktor"
            className="w-10 h-10 rounded-full object-cover"
          />
          <Button variant="primary">Start chat with Viktor</Button>
        </div>
      </div>
    </section>
  );
}