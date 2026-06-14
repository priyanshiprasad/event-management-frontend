import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ATTENDEE",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success state — show email verification message
  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0608",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              border: "2px solid #e8c97e",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
              fontSize: 32,
            }}
          >
            ✉️
          </div>
          <div className="gold-divider" style={{ margin: "0 auto 20px" }} />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 900,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Check Your Email
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              marginBottom: 32,
              fontWeight: 300,
            }}
          >
            We sent a verification link to{" "}
            <span style={{ color: "#e8c97e" }}>{form.email}</span>. Click the
            link in the email to activate your account.
          </p>

          <div
            style={{
              border: "1px solid rgba(232,201,126,0.15)",
              background: "rgba(232,201,126,0.03)",
              padding: "20px 24px",
              marginBottom: 28,
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 0,
                lineHeight: 1.7,
              }}
            >
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={async () => {
                  try {
                    await fetch("/api/auth/resend-verification", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: form.email }),
                    });
                    alert("Verification email resent!");
                  } catch {
                    alert("Failed to resend. Try again.");
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e8c97e",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  textDecoration: "underline",
                }}
              >
                click here to resend
              </button>
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="btn-primary"
            style={{ width: "100%", textAlign: "center" }}
          >
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0608",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Logo */}
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
            Event<span style={{ color: "#e8c97e" }}>Mgr</span>
          </span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <div className="gold-divider" />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36,
              fontWeight: 900,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
            }}
          >
            Join thousands of event enthusiasts today
          </p>
        </div>

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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="gold-input"
              placeholder="Enter your full name"
              required
            />
          </div>

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
              name="email"
              value={form.email}
              onChange={handleChange}
              className="gold-input"
              placeholder="Enter your email"
              required
            />
          </div>

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
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="gold-input"
              placeholder="Create a password"
              required
            />
          </div>

          <div style={{ marginBottom: 36 }}>
            <label
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              I Want To
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {[
                {
                  value: "ATTENDEE",
                  label: "Attend Events",
                  icon: "🎟️",
                  desc: "Browse and book events",
                },
                {
                  value: "ORGANIZER",
                  label: "Host Events",
                  icon: "🎯",
                  desc: "Create and manage events",
                },
              ].map((role) => (
                <label
                  key={role.value}
                  style={{
                    border: `1px solid ${form.role === role.value ? "rgba(232,201,126,0.5)" : "rgba(255,255,255,0.08)"}`,
                    background:
                      form.role === role.value
                        ? "rgba(232,201,126,0.06)"
                        : "rgba(255,255,255,0.02)",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "block",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={form.role === role.value}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <div style={{ fontSize: 24, marginBottom: 8 }}>
                    {role.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: form.role === role.value ? "#e8c97e" : "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {role.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {role.desc}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", textAlign: "center" }}
          >
            {loading ? "Creating Account..." : "Create Account →"}
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#e8c97e",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
