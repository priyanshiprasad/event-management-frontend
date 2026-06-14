import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Create Events",
      desc: "Full control over capacity, venue, and every event detail.",
    },
    {
      icon: "🎟️",
      title: "Instant Booking",
      desc: "Real-time availability — attendees book in seconds.",
    },
    {
      icon: "📊",
      title: "Live Analytics",
      desc: "Track registrations and stats as they happen.",
    },
    {
      icon: "🔒",
      title: "Secure Access",
      desc: "Role-based JWT auth so everyone sees what they need.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        background: "#0a0608",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.15s; }
        .delay-2 { transition-delay: 0.3s; }
        .delay-3 { transition-delay: 0.45s; }
        .delay-4 { transition-delay: 0.6s; }
        .delay-5 { transition-delay: 0.75s; }

        .btn-primary {
          display: inline-block; background: #e8c97e; color: #1a0e05;
          padding: 16px 40px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .btn-primary:hover { background: #f5d98a; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(232,201,126,0.35); }

        .btn-ghost {
          display: inline-block; background: transparent; color: rgba(255,255,255,0.85);
          padding: 15px 38px; border: 1px solid rgba(255,255,255,0.25);
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 400;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.6); color: #fff; background: rgba(255,255,255,0.06); }

        .feature-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(232,201,126,0.12);
          padding: 36px 28px; transition: all 0.35s ease; position: relative; overflow: hidden;
          margin: 8px; text-align: center;
        }
        .feature-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 3px; height: 0; background: linear-gradient(180deg, #e8c97e, transparent);
          transition: height 0.4s ease;
        }
        .feature-card:hover { background: rgba(232,201,126,0.07); border-color: rgba(232,201,126,0.3); transform: translateY(-4px); }
        .feature-card:hover::before { height: 100%; }

        .nav-link {
          color: rgba(255,255,255,0.65); font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: color 0.2s; text-decoration: none; background: none; border: none;
        }
        .nav-link:hover { color: #e8c97e; }

        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .gold-shimmer {
          background: linear-gradient(90deg, #c9a84c 0%, #f5d98a 40%, #e8c97e 60%, #c9a84c 100%);
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: shimmer 4s linear infinite;
        }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-inner { display: inline-block; animation: marquee 22s linear infinite; }

        @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(2deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-1.5deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-22px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 0.7; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes count-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .event-card-hover { transition: all 0.3s ease; }
        .event-card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.5); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .showcase-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 700,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: 0,
            right: 0,
            bottom: "-15%",
            backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            transform: `translateY(${scrollY * 0.25}px)`,
            willChange: "transform",
          }}
        />

        {/* Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,6,8,0.6) 0%, rgba(10,6,8,0.25) 35%, rgba(10,6,8,0.55) 70%, rgba(10,6,8,1) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 70% at 15% 50%, rgba(10,6,8,0.85) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 60% at 85% 50%, rgba(139,62,30,0.15) 0%, transparent 65%)",
          }}
        />

        {/* Navbar
        <nav style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, border: "1.5px solid #e8c97e",
              display: "flex", alignItems: "center", justifyContent: "center",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "rgba(232,201,126,0.1)",
            }}>
              <span style={{ color: "#e8c97e", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16 }}>E</span>
            </div>
            <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, letterSpacing: "0.02em" }}>
              Event<span style={{ color: "#e8c97e" }}>Mgr</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <button className="nav-link">Features</button>
            <button className="nav-link">Organizers</button>
            <button className="nav-link">Pricing</button>
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
            <button className="nav-link" onClick={() => navigate("/login")}>Sign In</button>
            <button className="btn-primary" onClick={() => navigate("/register")} style={{ padding: "11px 26px", fontSize: 13 }}>Get Started</button>
          </div>
        </nav> */}

        {/* Hero body — two column grid */}
        <div
          className="hero-grid"
          style={{
            position: "relative",
            zIndex: 5,
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            padding: "0 56px 80px",
            gap: 40,
            margin: 20,
          }}
        >
          {/* LEFT — text */}
          <div style={{ maxWidth: 620 }}>
            <div
              className={`fade-up ${loaded ? "visible" : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div style={{ width: 40, height: 1, background: "#e8c97e" }} />
              <span
                style={{
                  color: "#e8c97e",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                The Event Platform
              </span>
            </div>

            <h1
              className={`fade-up delay-1 ${loaded ? "visible" : ""}`}
              style={{
                fontSize: "clamp(48px, 5.5vw, 80px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: 28,
              }}
            >
              Every Great
              <br />
              <em className="gold-shimmer" style={{ fontStyle: "italic" }}>
                Moment
              </em>
              <br />
              <span
                style={{
                  fontWeight: 400,
                  fontSize: "0.72em",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Starts Here.
              </span>
            </h1>

            <p
              className={`fade-up delay-2 ${loaded ? "visible" : ""}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                maxWidth: 460,
                marginBottom: 40,
                fontWeight: 300,
              }}
            >
              From intimate gatherings to stadium spectacles — create, manage,
              and sell out your events with one elegant platform.
            </p>

            <div
              className={`fade-up delay-3 ${loaded ? "visible" : ""}`}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 44,
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate("/register")}
              >
                Create Your Event
              </button>
              <button className="btn-ghost" onClick={() => navigate("/login")}>
                Sign In
              </button>
            </div>

            <div
              className={`fade-up delay-4 ${loaded ? "visible" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div style={{ display: "flex" }}>
                {["#e91e63", "#9c27b0", "#3f51b5", "#009688"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: c,
                      border: "2px solid #0a0608",
                      marginLeft: i > 0 ? -10 : 0,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span
                  style={{ color: "#e8c97e", fontWeight: 500, fontSize: 14 }}
                >
                  10,000+
                </span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                  {" "}
                  attendees joined this month
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — creative floating event cards */}
          <div
            className={`hero-right fade-up delay-3 ${loaded ? "visible" : ""}`}
            style={{
              position: "relative",
              height: 480,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Rotating ring decoration */}
            <div
              style={{
                position: "absolute",
                width: 340,
                height: 340,
                border: "1px dashed rgba(232,201,126,0.15)",
                borderRadius: "50%",
                animation: "spin-slow 30s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 260,
                height: 260,
                border: "1px solid rgba(232,201,126,0.08)",
                borderRadius: "50%",
                animation: "spin-slow 20s linear infinite reverse",
              }}
            />

            {/* Center glow */}
            <div
              style={{
                position: "absolute",
                width: 180,
                height: 180,
                background:
                  "radial-gradient(circle, rgba(232,201,126,0.12) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />

            {/* Floating card 1 — Live concert */}
            <div
              className="event-card-hover"
              style={{
                position: "absolute",
                top: 20,
                left: 0,
                width: 200,
                background: "rgba(15,10,12,0.92)",
                border: "1px solid rgba(232,201,126,0.25)",
                backdropFilter: "blur(12px)",
                padding: "14px",
                animation: "float1 6s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 100,
                  backgroundImage: "url('./assets/neonpulse.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 6px #4ade80",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "#4ade80",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Live Now
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                Neon Pulse Festival
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                🎵 Mumbai · 2,400 attending
              </div>
            </div>

            {/* Floating card 2 — Tech conference */}
            <div
              className="event-card-hover"
              style={{
                position: "absolute",
                top: 60,
                right: 0,
                width: 185,
                background: "rgba(15,10,12,0.92)",
                border: "1px solid rgba(232,201,126,0.2)",
                backdropFilter: "blur(12px)",
                padding: "14px",
                animation: "float2 7s ease-in-out infinite 1s",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 85,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                TechSummit 2026
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 8,
                }}
              >
                💻 Bangalore · Mar 15
              </div>
              <div
                style={{
                  background: "#e8c97e",
                  padding: "4px 10px",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#1a0e05",
                    letterSpacing: "0.08em",
                  }}
                >
                  REGISTER →
                </span>
              </div>
            </div>

            {/* Floating card 3 — ticket count */}
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 20,
                background: "rgba(232,201,126,0.95)",
                padding: "16px 20px",
                animation: "float3 5s ease-in-out infinite 0.5s",
                minWidth: 150,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#1a0e05",
                  opacity: 0.6,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Tickets Sold Today
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#1a0e05",
                  lineHeight: 1,
                }}
              >
                1,284
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#1a0e05",
                  opacity: 0.55,
                  marginTop: 4,
                }}
              >
                ↑ 23% from yesterday
              </div>
            </div>

            {/* Floating card 4 — upcoming gala */}
            <div
              className="event-card-hover"
              style={{
                position: "absolute",
                bottom: 30,
                right: 10,
                width: 170,
                background: "rgba(15,10,12,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                padding: "14px",
                animation: "float1 8s ease-in-out infinite 2s",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 75,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                Black-Tie Gala
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Delhi · Apr 3
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "#e8c97e",
                  }}
                >
                  12 left
                </span>
              </div>
            </div>

            {/* Center dot */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#e8c97e",
                position: "relative",
                zIndex: 2,
                boxShadow: "0 0 20px rgba(232,201,126,0.6)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  border: "1px solid rgba(232,201,126,0.4)",
                  animation: "pulse-ring 2s ease-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  border: "1px solid rgba(232,201,126,0.3)",
                  animation: "pulse-ring 2s ease-out infinite 0.6s",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE TICKER ──────────────────────────────────────────── */}
      <div
        style={{
          background: "#e8c97e",
          padding: "14px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div className="marquee-inner">
          {Array(6)
            .fill(
              "✦ Concerts  ✦ Tech Conferences  ✦ Art Exhibitions  ✦ Galas & Fundraisers  ✦ Sports Events  ✦ Workshops  ✦ Festivals  ✦ Corporate Summits  ",
            )
            .map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#1a0e05",
                  paddingRight: 4,
                }}
              >
                {t}
              </span>
            ))}
        </div>
      </div>

      {/* ── SHOWCASE ────────────────────────────────────────────────── */}
      <div
        className="showcase-grid"
        style={{
          padding: "100px 56px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 32, height: 1, background: "#e8c97e" }} />
            <span
              style={{
                color: "#e8c97e",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Built for Every Scale
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 24,
              letterSpacing: "-0.01em",
            }}
          >
            Your Vision,
            <br />
            <em style={{ color: "#e8c97e", fontStyle: "italic" }}>Perfectly</em>
            <br />
            Executed.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              marginBottom: 36,
              fontWeight: 300,
            }}
          >
            Whether you're hosting 50 guests or 50,000 fans — EventMgr gives
            organizers and attendees a seamless, beautiful experience from first
            click to final curtain call.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Events Created", value: "500+" },
              { label: "Cities Covered", value: "50+" },
              { label: "Organizers", value: "200+" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", alignItems: "center", gap: 20 }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 36,
                    fontWeight: 900,
                    color: "#e8c97e",
                    minWidth: 80,
                  }}
                >
                  {item.value}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(232,201,126,0.15)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", height: 520 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 32,
              right: 0,
              height: 340,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(232,201,126,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "62%",
              height: 220,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(232,201,126,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -8,
              left: 24,
              width: 3,
              height: 80,
              background: "linear-gradient(180deg, #e8c97e, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 80,
              right: 16,
              background: "#e8c97e",
              padding: "12px 20px",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#1a0e05",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              4.9★
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#1a0e05",
                opacity: 0.7,
                letterSpacing: "0.08em",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              RATED BY ORGANIZERS
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────────── */}
      <div
        id="features"
        style={{ padding: "0 56px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div style={{ width: 32, height: 1, background: "#e8c97e" }} />
            <span
              style={{
                color: "#e8c97e",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Platform Features
            </span>
            <div style={{ width: 32, height: 1, background: "#e8c97e" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 3vw, 42px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            Everything You Need to{" "}
            <em style={{ color: "#e8c97e", fontStyle: "italic" }}>Shine</em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 2,
          }}
        >
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div style={{ fontSize: 32, marginBottom: 20 }}>{f.icon}</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ──────────────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,6,8,0.82)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "100px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: 20,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Ready to Fill
            <br />
            <em className="gold-shimmer" style={{ fontStyle: "italic" }}>
              Every Seat?
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 44,
              fontWeight: 300,
              maxWidth: 480,
              margin: "0 auto 44px",
            }}
          >
            Join hundreds of organizers who trust EventMgr to bring their
            visions to life.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              Create Free Account →
            </button>
            <button className="btn-ghost" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#060304",
          padding: "32px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(232,201,126,0.1)",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            fontSize: 16,
          }}
        >
          Event<span style={{ color: "rgba(232,201,126,0.5)" }}>Mgr</span>
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.04em",
          }}
        >
          © 2026 EventManager. Built with Spring Boot & React.
        </span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
