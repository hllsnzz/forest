/**
 * Fincash — 暗色金融主题 Hero 着陆页
 * 复刻自: https://fincash.demos.tailgrids.com/
 * 合并所有子页面（Features / Pricing / Contact）为单页滚动视图
 * 特性: 滚动入场动画、统计数字递进、固定导航、移动端汉堡菜单
 */
import { useState, useEffect, useRef, useCallback } from "react";
import "./fincash.css";

/* ============================================ */
/* 工具: 滚动入场 Intersection Observer Hook     */
/* ============================================ */
function useInView(
  options?: IntersectionObserverInit,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

/* ============================================ */
/* AnimatedSection — 带入场动画的区块容器         */
/* ============================================ */
function AnimatedSection(props: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fincash-section ${inView ? "visible" : ""}${props.delay ? " fincash-delay-" + props.delay : ""}${props.className ? " " + props.className : ""}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

/* ============================================ */
/* 导航菜单数据                                  */
/* ============================================ */
const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "stats", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
] as const;

type PageId = (typeof NAV_ITEMS)[number]["id"];

/* ============================================ */
/* Header 组件                                   */
/* ============================================ */
function Header(props: {
  activeSection: PageId;
  onNavigate: (id: PageId) => void;
}) {
  const { activeSection, onNavigate } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--fincash-border)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            fontWeight: 700,
            color: "var(--fincash-text)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              background: "var(--fincash-accent)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            F
          </span>
          Fincash
        </button>

        {/* Desktop nav links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                style={{
                  padding: "8px 16px",
                  color:
                    activeSection === item.id
                      ? "var(--fincash-text)"
                      : "var(--fincash-text-secondary)",
                  background:
                    activeSection === item.id
                      ? "rgba(255,255,255,0.05)"
                      : "transparent",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit",
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          className="hidden md:flex"
        >
          <button
            onClick={() => handleNav("contact")}
            style={{
              background: "transparent",
              color: "var(--fincash-text-secondary)",
              padding: "8px 16px",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => handleNav("contact")}
            style={{
              background: "var(--fincash-accent)",
              color: "#0a0a0a",
              padding: "10px 24px",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.3s ease",
            }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--fincash-text)",
            fontSize: 24,
            cursor: "pointer",
            padding: 4,
          }}
          className="md:hidden block"
          aria-label="Toggle menu"
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fincash-mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id} style={{ marginBottom: 8 }}>
              <button
                onClick={() => handleNav(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  color:
                    activeSection === item.id
                      ? "var(--fincash-accent)"
                      : "var(--fincash-text-secondary)",
                  background:
                    activeSection === item.id
                      ? "rgba(214,255,102,0.08)"
                      : "transparent",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

/* ============================================ */
/* Hero 区块                                     */
/* ============================================ */
function HeroSection(props: { onNavigate: (id: PageId) => void }) {
  const [ref, inView] = useInView();
  const { onNavigate } = props;

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        padding: "160px 0 100px",
        background: "var(--fincash-bg)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          className={`fincash-section ${inView ? "visible" : ""} fincash-badge-pulse`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: "rgba(214,255,102,0.1)",
            borderRadius: 100,
            color: "var(--fincash-accent)",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 24,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          New Update — v2.0 Launch
        </div>

        {/* Title */}
        <h1
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fincash-text)",
            margin: "0 0 20px",
            transitionDelay: "0.15s",
            maxWidth: 800,
          }}
        >
          Manage Your Money
          <br />
          Unlock Your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #d6ff66, #a8e640)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Financial Freedom
          </span>
        </h1>

        {/* Description */}
        <p
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{
            fontSize: "clamp(16px, 1.4vw, 18px)",
            color: "var(--fincash-text-secondary)",
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 0 36px",
            transitionDelay: "0.3s",
          }}
        >
          The all-in-one app that tracks spending, automates saving, and
          provides insights to grow your wealth with clarity. Your unified
          dashboard for financial clarity.
        </p>

        {/* Actions */}
        <div
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            transitionDelay: "0.45s",
          }}
        >
          <button
            onClick={() => onNavigate("contact")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "var(--fincash-accent)",
              color: "#0a0a0a",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "transform 0.3s ease, background 0.3s ease",
            }}
          >
            Download Now
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate("stats")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "transparent",
              color: "var(--fincash-text)",
              border: "1px solid var(--fincash-border)",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================ */
/* Stats 区块 — 含数字递进动画                    */
/* ============================================ */
function StatsSection() {
  const [ref, inView] = useInView();
  const [counted, setCounted] = useState({
    assets: false,
    users: false,
    rating: false,
  });

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(
      () => setCounted((p) => ({ ...p, assets: true })),
      200,
    );
    const t2 = setTimeout(
      () => setCounted((p) => ({ ...p, users: true })),
      500,
    );
    const t3 = setTimeout(
      () => setCounted((p) => ({ ...p, rating: true })),
      800,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView]);

  const stats = [
    {
      number: counted.assets ? "$2.4B+" : "$0",
      label: "Assets Securely Managed",
    },
    {
      number: counted.users ? "1.2M+" : "0",
      label: "Trusted by users",
    },
    {
      number: counted.rating ? "4.8\u2605" : "0",
      label: "App Store rating",
    },
  ];

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        padding: "80px 0",
        background: "var(--fincash-bg-secondary)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--fincash-text)",
              margin: 0,
            }}
          >
            Our Journey in Numbers: Growth, Trust, and Impact
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`fincash-section ${inView ? "visible" : ""}`}
              style={{
                textAlign: "center",
                padding: "40px 24px",
                background: "var(--fincash-bg-card)",
                borderRadius: 16,
                border: "1px solid var(--fincash-border)",
                transitionDelay: `${0.2 + i * 0.15}s`,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 800,
                  color: "var(--fincash-accent)",
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "var(--fincash-text-secondary)",
                  fontWeight: 400,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================ */
/* Features 区块                                 */
/* ============================================ */
const FEATURES = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "All Your Finances, One View",
    desc: "Check your balance, recent activity, and quick actions from a single, intuitive dashboard.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Tracking Income Expense",
    desc: "Monitor deposits and withdrawals with clear visuals that help you understand your money flow.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Smart Dashboard",
    desc: "View balances, activity, and actions at a glance from your home screen.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Automated Savings",
    desc: "Set rules to save automatically and watch your money grow without thinking about it.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Real-time Analytics",
    desc: "Get instant insights into your spending patterns and financial health with rich visualizations.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Bank-grade Security",
    desc: "End-to-end encryption and multi-factor authentication keep your data safe at all times.",
  },
];

function FeaturesSection() {
  const [ref, inView] = useInView();

  return (
    <section
      id="features"
      ref={ref}
      style={{
        padding: "100px 0",
        background: "var(--fincash-bg)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--fincash-text)",
              margin: "0 0 16px",
            }}
          >
            Your Everyday Finance, Simplified
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--fincash-text-secondary)",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            From sending money to tracking expenses, this app brings all
            essential financial tools into one clean and intuitive experience —
            designed for speed, clarity, and security.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`fincash-section fincash-feature-card ${inView ? "visible" : ""}`}
              style={{
                padding: "32px",
                background: "var(--fincash-bg-card)",
                borderRadius: 16,
                border: "1px solid var(--fincash-border)",
                transitionDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--fincash-accent-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--fincash-accent)",
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--fincash-text)",
                  margin: "0 0 10px",
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--fincash-text-secondary)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================ */
/* Pricing 区块                                  */
/* ============================================ */
const PLANS = [
  {
    name: "Starter",
    desc: "Perfect for individuals getting started",
    price: "0",
    features: [
      "Basic expense tracking",
      "Monthly reports",
      "Single account",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    desc: "Best for active budgeters",
    price: "12",
    features: [
      "Unlimited transactions",
      "AI-powered insights",
      "Up to 5 accounts",
      "Goal setting & tracking",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    desc: "For teams and businesses",
    price: "49",
    features: [
      "Everything in Pro",
      "Unlimited accounts",
      "Team collaboration",
      "API access",
      "Custom integrations",
      "Dedicated support",
    ],
    featured: false,
  },
];

function PricingSection() {
  const [ref, inView] = useInView();

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        padding: "100px 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--fincash-text)",
              margin: "0 0 16px",
            }}
          >
            Simple, Transparent Pricing
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--fincash-text-secondary)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            alignItems: "start",
          }}
        >
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`fincash-section ${plan.featured ? "fincash-pricing-featured" : ""} ${inView ? "visible" : ""} ${plan.featured ? "bg-[linear-gradient(180deg,rgba(214,255,102,0.8)_0%,rgba(23,23,23,0.8)_100%)]" : ""}`}
              style={{
                borderRadius: 16,
                transitionDelay: `${0.1 + i * 0.12}s`,
                position: "relative",
              }}
            >
              <div
                className="bg-neutral-900"
                style={{
                  borderRadius: 16,
                  padding: "40px 32px",
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    padding: "4px 10px",
                    background: "var(--fincash-accent-dim)",
                    color: "var(--fincash-accent)",
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  Popular
                </div>

                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--fincash-text)",
                    marginBottom: 4,
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--fincash-text-secondary)",
                    marginBottom: 24,
                    lineHeight: 1.5,
                  }}
                >
                  {plan.desc}
                </div>

                {/* Price */}
                <div style={{ marginBottom: 28 }}>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--fincash-text)",
                      verticalAlign: "top",
                    }}
                  >
                    $
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(40px, 4vw, 52px)",
                      fontWeight: 800,
                      color: "var(--fincash-accent)",
                      lineHeight: 1,
                      margin: "0 4px",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "var(--fincash-text-muted)",
                      fontWeight: 400,
                    }}
                  >
                    /month
                  </span>
                </div>

                {/* Features */}
                <ul
                  style={{ listStyle: "none", margin: "0 0 28px", padding: 0 }}
                >
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 0",
                        fontSize: 14,
                        color: "var(--fincash-text-secondary)",
                        borderBottom: "1px solid var(--fincash-border)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--fincash-accent)",
                          fontWeight: 700,
                        }}
                      >
                        \u2713
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: plan.featured
                      ? "var(--fincash-accent)"
                      : "transparent",
                    color: plan.featured ? "#0a0a0a" : "var(--fincash-text)",
                    border: plan.featured
                      ? "none"
                      : "1px solid var(--fincash-border)",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.3s ease",
                  }}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================ */
/* Contact 区块                                  */
/* ============================================ */
function ContactSection() {
  const [ref, inView] = useInView();

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "100px 0",
        background: "var(--fincash-bg)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--fincash-text)",
              margin: "0 0 16px",
            }}
          >
            Get in Touch
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--fincash-text-secondary)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className={`fincash-section ${inView ? "visible" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
            alignItems: "start",
            transitionDelay: "0.2s",
          }}
        >
          {/* Info */}
          <div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--fincash-text)",
                margin: "0 0 16px",
              }}
            >
              Let's talk about your financial goals
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "var(--fincash-text-secondary)",
                lineHeight: 1.7,
                margin: "0 0 32px",
              }}
            >
              Our team is ready to help you get the most out of Fincash. Whether
              you need support, have a feature request, or just want to say
              hello — we're here for you.
            </p>

            {[
              { icon: "phone", label: "Phone", value: "+1 (555) 123-4567" },
              { icon: "email", label: "Email", value: "hello@fincash.app" },
              {
                icon: "location",
                label: "Location",
                value: "San Francisco, CA 94105",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", gap: 12, marginBottom: 20 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "var(--fincash-accent-dim)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--fincash-accent)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon === "phone" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ) : item.icon === "email" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--fincash-text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--fincash-text)" }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            style={{
              padding: 40,
              background: "var(--fincash-bg-card)",
              borderRadius: 16,
              border: "1px solid var(--fincash-border)",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for reaching out! We'll get back to you soon.");
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: "var(--fincash-text-secondary)",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--fincash-bg)",
                  border: "1px solid var(--fincash-border)",
                  borderRadius: 8,
                  color: "var(--fincash-text)",
                  fontFamily: "inherit",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: "var(--fincash-text-secondary)",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--fincash-bg)",
                  border: "1px solid var(--fincash-border)",
                  borderRadius: 8,
                  color: "var(--fincash-text)",
                  fontFamily: "inherit",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: "var(--fincash-text-secondary)",
                }}
              >
                Message
              </label>
              <textarea
                placeholder="How can we help you?"
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--fincash-bg)",
                  border: "1px solid var(--fincash-border)",
                  borderRadius: 8,
                  color: "var(--fincash-text)",
                  fontFamily: "inherit",
                  fontSize: 15,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  minHeight: 100,
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 0",
                background: "var(--fincash-accent)",
                color: "#0a0a0a",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============================================ */
/* Footer 组件                                   */
/* ============================================ */
function FooterSection() {
  return (
    <footer
      style={{
        padding: "64px 0 32px",
        background: "var(--fincash-bg-secondary)",
        borderTop: "1px solid var(--fincash-border)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: 40,
          }}
          className="footer-grid-default"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 22,
                fontWeight: 700,
                color: "var(--fincash-text)",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--fincash-accent)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a0a0a",
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                F
              </span>
              Fincash
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--fincash-text-secondary)",
                lineHeight: 1.7,
                maxWidth: 300,
                margin: 0,
              }}
            >
              A modern fintech app designed to make payments, money management,
              and financial tracking simple, secure, and accessible.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fincash-text)",
                margin: "0 0 20px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {["Home", "Features", "Pricing", "Contact"].map((link) => (
                <li key={link} style={{ marginBottom: 12 }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      color: "var(--fincash-text-secondary)",
                      textDecoration: "none",
                      fontSize: 14,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fincash-text)",
                margin: "0 0 20px",
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {["Privacy Policy", "Terms & conditions"].map((link) => (
                <li key={link} style={{ marginBottom: 12 }}>
                  <a
                    href="#"
                    style={{
                      color: "var(--fincash-text-secondary)",
                      textDecoration: "none",
                      fontSize: 14,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fincash-text)",
                margin: "0 0 16px",
              }}
            >
              Newsletter
            </h4>
            <p
              style={{
                fontSize: 14,
                color: "var(--fincash-text-secondary)",
                margin: "0 0 16px",
                lineHeight: 1.7,
              }}
            >
              Stay up to date with the latest features and releases.
            </p>
            <form
              style={{ display: "flex", gap: 8 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed! (demo)");
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "var(--fincash-bg)",
                  border: "1px solid var(--fincash-border)",
                  borderRadius: 8,
                  color: "var(--fincash-text)",
                  fontFamily: "inherit",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  background: "var(--fincash-accent)",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--fincash-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            color: "var(--fincash-text-muted)",
          }}
        >
          <span>&copy; 2026 Fincash. All rights reserved.</span>
          <span>Built with care</span>
        </div>

        <style>{`
          .footer-grid-default {
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
          }
          @media (max-width: 1024px) {
            .footer-grid-default {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (max-width: 640px) {
            .footer-grid-default {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </footer>
  );
}

/* ============================================ */
/* 主页面组件                                    */
/* ============================================ */
export default function Fincash() {
  const [activeSection, setActiveSection] = useState<PageId>("hero");

  // 检测当前滚动位置并更新 activeSection
  const handleScroll = useCallback(() => {
    const sectionIds: PageId[] = ["hero", "stats", "pricing", "contact"];
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: PageId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--fincash-bg)",
        color: "var(--fincash-text)",
      }}
    >
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      {/* 各区块 */}
      <HeroSection onNavigate={scrollToSection} />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
