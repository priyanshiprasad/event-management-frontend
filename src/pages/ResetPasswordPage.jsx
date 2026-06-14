import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../api/authApi";

function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (!t) {
      setError("Invalid reset link. Please request a new one.");
    } else {
      setToken(t);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Reset failed. Link may have expired.",
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
              border: "2px solid #4ade80",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
              fontSize: 32,
            }}
          >
            ✓
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 900,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Password Reset!
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
            Your password has been updated successfully. Redirecting you to
            login...
          </p>
          <Link
            to="/login"
            className="btn-primary"
            style={{ display: "block", textAlign: "center" }}
          >
            Go to Login →
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
            Set New Password
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
            }}
          >
            Choose a strong password for your account
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
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="gold-input"
              placeholder="Enter new password"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="gold-input"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !token}
            style={{ width: "100%", textAlign: "center" }}
          >
            {loading ? "Resetting..." : "Reset Password →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
