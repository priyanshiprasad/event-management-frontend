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

  const scrollToFeatures = () => {
    if (window.location.pathname !== "/landing") {
      navigate("/landing");
      setTimeout(() => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      padding: "16px clamp(16px, 4vw, 48px)",
      background: isLanding ? "transparent" : "rgba(10,6,8,0.95)",
      borderBottom: isLanding ? "none" : "1px solid rgba(232,201,126,0.1)",
      backdropFilter: "blur(12px)",
      width: "100%",
      boxSizing: "border-box",
      overflow: "visible",
    }}>
      {/* Logo */}
      <Link to={isLoggedIn ? "/home" : "/landing"} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32,
          border: "1.5px solid #e8c97e",
          display: "flex", alignItems: "center", justifyContent: "center",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "rgba(232,201,126,0.1)",
          flexShrink: 0,
        }}>
          <span style={{ color: "#e8c97e", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14 }}>E</span>
        </div>
        <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
          Event<span style={{ color: "#e8c97e" }}>Mgr</span>
        </span>
      </Link>

      {/* Links */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(8px, 2vw, 28px)",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        flex: 1,
        minWidth: 0,
      }}>
        {isLoggedIn ? (
          <>
            <Link to="/home" className="nav-link-dark" style={{ whiteSpace: "nowrap" }}>Browse Events</Link>

            {!isAdmin && !isOrganizer && (
              <Link to="/my-bookings" className="nav-link-dark" style={{ whiteSpace: "nowrap" }}>My Bookings</Link>
            )}

            {isOrganizer && (
              <>
                <Link to="/organizer" className="nav-link-dark" style={{ whiteSpace: "nowrap" }}>My Events</Link>
                <Link to="/organizer/create" className="nav-link-dark" style={{ whiteSpace: "nowrap" }}>Create Event</Link>
              </>
            )}

            {isAdmin && (
              <Link to="/admin" className="nav-link-dark" style={{ whiteSpace: "nowrap" }}>Admin Panel</Link>
            )}

            {/* Divider — hide on small screens */}
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", display: "none" }} className="nav-divider" />

            {/* User badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div style={{
                width: 28, height: 28,
                background: "rgba(232,201,126,0.15)",
                border: "1px solid rgba(232,201,126,0.3)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "#e8c97e", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12 }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="user-info-text" style={{ display: "none" }}>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
                  {user?.name}
                </div>
                <div style={{ color: "#e8c97e", fontSize: 9, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {user?.role}
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={handleLogout} style={{ padding: "8px 18px", fontSize: 11, whiteSpace: "nowrap" }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            {isLanding && (
              <>
                <button className="nav-link-dark" onClick={() => navigate("/login")} style={{ whiteSpace: "nowrap" }}>Browse Events</button>
                <button className="nav-link-dark" onClick={scrollToFeatures} style={{ whiteSpace: "nowrap" }}>Features</button>
                <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} className="nav-divider" />
              </>
            )}
            <button className="nav-link-dark" onClick={() => navigate("/login")} style={{ whiteSpace: "nowrap" }}>Sign In</button>
            <button className="btn-primary" onClick={() => navigate("/register")} style={{ padding: "9px 20px", fontSize: 11, whiteSpace: "nowrap" }}>
              Get Started
            </button>
          </>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .user-info-text { display: block !important; }
          .nav-divider { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

