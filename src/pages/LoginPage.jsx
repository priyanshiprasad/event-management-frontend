import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "true") {
      setVerified(true);
    }
  }, []);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await loginUser({ email, password });
      const { token, name, role } = response.data;
      login(token, { name, email, role });
      if (role === "ADMIN") navigate("/admin");
      else if (role === "ORGANIZER") navigate("/organizer");
      else navigate("/home");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0608", display: "flex" }}>
      {/* Left panel — decorative */}
      <div
        style={{
          display: "none",
          width: "45%",
          position: "relative",
          overflow: "hidden",
        }}
        className="login-left"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,6,8,0.75)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(232,201,126,0.08) 0%, transparent 60%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "48px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <div
              style={{
                width: 40,
                height: 1,
                background: "#e8c97e",
                marginBottom: 20,
              }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 42,
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Every Great
              <br />
              <em style={{ color: "#e8c97e", fontStyle: "italic" }}>Moment</em>
              <br />
              Starts Here.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Join thousands of event lovers discovering and creating
              unforgettable experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 32px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Mobile logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 48,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                border: "1.5px solid #e8c97e",
                clipPath:
                  "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                background: "rgba(232,201,126,0.1)",
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
                E
              </span>
            </div>
            <span
              style={{
                color: "#fff",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Event<span style={{ color: "#e8c97e" }}>Manager</span>
            </span>
          </div>

          <div style={{ marginBottom: 26 }}>
            <div className="gold-divider" />
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 36,
                fontWeight: 900,
                color: "#fff",
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}
            >
              Welcome Back
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
              }}
            >
              Sign in to continue your journey
            </p>
          </div>

          {verified && (
            <div
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
                color: "#4ade80",
                padding: "12px 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                marginBottom: 24,
              }}
            >
              ✓ Email verified successfully! You can now sign in.
            </div>
          )}

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
                padding: "12px 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                marginBottom: 24,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="gold-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="gold-input"
                placeholder="Enter your password"
                required
              />
              <Link
                to="/forgot-password"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  textAlign: "right",
                  display: "block",
                  marginTop: 8,
                  color: "#e8c97e",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: "100%", textAlign: "center" }}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              textAlign: "center",
              marginTop: 28,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#e8c97e",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .login-left { display: block !important; }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
