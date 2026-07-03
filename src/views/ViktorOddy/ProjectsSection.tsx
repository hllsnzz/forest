import { useInViewAnimation } from "./useInViewAnimation";

const PROJECTS = [
  {
    name: "evr",
    desc: "From idea to millions raised for a web3 AI product",
    img: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  },
  {
    name: "Automation Machines",
    desc: "Streamlining industrial automation processes",
    img: "https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif",
  },
  {
    name: "xPortfolio",
    desc: "Modern portfolio management platform",
    img: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  },
];

function ProjectItem({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const { ref, isInView } = useInViewAnimation();
  return (
    <div
      ref={ref}
      className={isInView ? "animate-fade-in-up" : "opacity-0"}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="ml-20 md:ml-28 mb-4">
        <h3 className="font-mondwest text-2xl md:text-3xl font-semibold" style={{ color: "#051A24" }}>
          {project.name}
        </h3>
        <p className="text-sm md:text-base mt-1" style={{ color: "rgba(5,26,36,0.7)" }}>
          {project.desc}
        </p>
      </div>
      <img
        src={project.img}
        alt={project.name}
        loading="lazy"
        className="w-full rounded-2xl shadow-lg object-cover"
        style={{ maxHeight: 500 }}
      />
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {PROJECTS.map((p, i) => (
          <ProjectItem key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}