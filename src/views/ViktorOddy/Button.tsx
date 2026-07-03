interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({ variant, children, href, className = "", onClick }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full text-sm transition-all duration-200 cursor-pointer";

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "#051A24",
      color: "white",
      padding: "0.75rem 1.75rem",
      fontWeight: 500,
      boxShadow:
        "0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)",
    },
    secondary: {
      background: "white",
      color: "#051A24",
      padding: "0.75rem 1.75rem",
      fontWeight: 500,
      boxShadow: "0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)",
    },
    tertiary: {
      background: "transparent",
      color: "#051A24",
      padding: "0.75rem 1.75rem",
      fontWeight: 500,
      border: "1px solid rgba(5,26,36,0.15)",
    },
  };

  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`${base} ${className}`}
      style={styles[variant]}
    >
      {children}
    </Tag>
  );
}