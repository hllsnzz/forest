import { ArrowUpRight } from "lucide-react";
import Button from "./Button";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <Button variant="primary">Start a chat</Button>
        <div className="flex items-start gap-12">
          <div className="flex items-start gap-2 mt-1">
            <ArrowUpRight className="w-5 h-5" style={{ color: "#051A24" }} />
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-base hover:opacity-70 transition-opacity" style={{ color: "#051A24" }}>Services</a>
              <a href="#" className="text-base hover:opacity-70 transition-opacity" style={{ color: "#051A24" }}>Work</a>
              <a href="#" className="text-base hover:opacity-70 transition-opacity" style={{ color: "#051A24" }}>About</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-base hover:opacity-70 transition-opacity" style={{ color: "#051A24" }}>x.com</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base hover:opacity-70 transition-opacity" style={{ color: "#051A24" }}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}