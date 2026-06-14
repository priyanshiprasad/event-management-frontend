import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, user, logout, isAdmin, isOrganizer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/landing";

  const handleLogout = () => {
    logout();
    navigate("/landing");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 48px",
        background: isLanding ? "transparent" : "rgba(10,6,8,0.95)",
        borderBottom: isLanding ? "none" : "1px solid rgba(232,201,126,0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <Link
        to={isLoggedIn ? "/home" : "/landing"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "1.5px solid #e8c97e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "rgba(232,201,126,0.1)",
          }}
        >
          <span
            style={{
              color: "#e8c97e",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            E
          </span>
        </div>
        <span
          style={{
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "0.02em",
          }}
        >
          Event<span style={{ color: "#e8c97e" }}>Manager</span>
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {isLoggedIn ? (
          <>
            <Link to="/home" className="nav-link-dark">
              Browse Events
            </Link>

            {!isAdmin && !isOrganizer && (
              <Link to="/my-bookings" className="nav-link-dark">
                My Bookings
              </Link>
            )}

            {isOrganizer && (
              <>
                <Link to="/organizer" className="nav-link-dark">
                  My Events
                </Link>
                <Link to="/organizer/create" className="nav-link-dark">
                  Create Event
                </Link>
              </>
            )}

            {isAdmin && (
              <Link to="/admin" className="nav-link-dark">
                Admin Panel
              </Link>
            )}

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 16,
                background: "rgba(255,255,255,0.12)",
              }}
            />

            {/* User badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "rgba(232,201,126,0.15)",
                  border: "1px solid rgba(232,201,126,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#e8c97e",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {user?.name}
                </div>
                <div
                  style={{
                    color: "#e8c97e",
                    fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {user?.role}
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleLogout}
              style={{ padding: "9px 22px", fontSize: 12 }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            {isLanding && (
              <>
                <button
                  className="nav-link-dark"
                  onClick={() => navigate("/login")}
                >
                  Browse Events
                </button>
                <button
                  className="nav-link-dark"
                  onClick={() => {
                    if (window.location.pathname !== "/landing") {
                      navigate("/landing");
                      setTimeout(() => {
                        document
                          .getElementById("features")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    } else {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Features
                </button>
                <div
                  style={{
                    width: 1,
                    height: 16,
                    background: "rgba(255,255,255,0.12)",
                  }}
                />
              </>
            )}
            <button
              className="nav-link-dark"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
              style={{ padding: "10px 24px", fontSize: 12 }}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
