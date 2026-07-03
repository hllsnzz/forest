import Button from "./Button";

export default function BottomNav() {
  return (
    <nav
      className="fixed z-50 bottom-6 left-1/2"
      style={{
        transform: "translateX(-50%)",
      }}
    >
      <div
        className="inline-flex items-center gap-4 rounded-full px-8 py-2"
        style={{
          background: "white",
          boxShadow:
            "0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0)",
        }}
      >
        <span className="font-mondwest text-2xl font-semibold" style={{ color: "#051A24" }}>
          V
        </span>
        <Button variant="primary">Start a chat</Button>
      </div>
    </nav>
  );
}