import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to send reset email. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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
        <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
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
            📧
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
            We sent a password reset link to{" "}
            <span style={{ color: "#e8c97e" }}>{email}</span>. The link expires
            in 1 hour.
          </p>
          <Link
            to="/login"
            className="btn-primary"
            style={{ display: "block", textAlign: "center" }}
          >
            Back to Login →
          </Link>
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
      <div style={{ width: "100%", maxWidth: 440 }}>
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
            Forgot Password
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
            }}
          >
            Enter your email and we'll send you a reset link
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
          <div style={{ marginBottom: 28 }}>
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
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", textAlign: "center" }}
          >
            {loading ? "Sending..." : "Send Reset Link →"}
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
          Remembered your password?{" "}
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

export default ForgotPasswordPage;
