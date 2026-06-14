import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings, cancelBooking } from "../api/bookingApi";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getMyBookings();
      setBookings(res.data);
    } catch {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    setCancelling(bookingId);
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.error || "Cancellation failed.");
    } finally {
      setCancelling(null);
    }
  };

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const cancelled = bookings.filter((b) => b.status === "CANCELLED");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0608" }}>
      {/* Header */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(232,201,126,0.1)",
          padding: "64px 56px 56px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse at top right, rgba(232,201,126,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 36,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#e8c97e")}
            onMouseOut={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            ← Back to Events
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div style={{ width: 32, height: 1, background: "#e8c97e" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e8c97e",
              }}
            >
              Your Reservations
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 40,
            }}
          >
            My{" "}
            <em style={{ fontStyle: "italic", color: "#e8c97e" }}>Bookings</em>
          </h1>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 2 }}>
            {[
              { label: "Total Bookings", value: bookings.length },
              { label: "Confirmed", value: confirmed.length },
              { label: "Cancelled", value: cancelled.length },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(232,201,126,0.1)",
                  padding: "20px 32px",
                  margin: "8px",
                  borderLeft:
                    i > 0 ? "none" : "1px solid rgba(232,201,126,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 32,
                    fontWeight: 900,
                    textAlign: "center",
                    color:
                      i === 1 ? "#4ade80" : i === 2 ? "#f87171" : "#e8c97e",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 56px 80px" }}
      >
        {/* Loading */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "80px 0",
            }}
          >
            <div className="spinner-gold" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#f87171",
                fontSize: 14,
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && bookings.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 64,
                color: "rgba(232,201,126,0.15)",
                marginBottom: 24,
              }}
            >
              ✦
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28,
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 12,
              }}
            >
              No Bookings Yet
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.25)",
                fontWeight: 300,
                marginBottom: 36,
              }}
            >
              Browse events and reserve your first spot
            </p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Browse Events →
            </button>
          </div>
        )}

        {/* Bookings list */}
        {!loading && !error && bookings.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {bookings.map((booking) => {
              const isConfirmed = booking.status === "CONFIRMED";
              const formattedDate = new Date(
                booking.eventDate,
              ).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const bookedOn = new Date(booking.bookedAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <div
                  key={booking.id}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${isConfirmed ? "rgba(232,201,126,0.1)" : "rgba(255,255,255,0.05)"}`,
                    opacity: isConfirmed ? 1 : 0.55,
                    transition: "all 0.2s",
                    margin: "8px",
                  }}
                >
                  {/* Top accent line */}
                  {isConfirmed && (
                    <div
                      style={{
                        height: 1,
                        background:
                          "linear-gradient(90deg, #e8c97e, transparent)",
                      }}
                    />
                  )}

                  <div
                    style={{
                      padding: "28px 32px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 24,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {/* Status + booking id */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginBottom: 14,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: isConfirmed ? "#4ade80" : "#f87171",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: isConfirmed ? "#4ade80" : "#f87171",
                              display: "inline-block",
                            }}
                          />
                          {isConfirmed ? "Confirmed" : "Cancelled"}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            color: "rgba(255,255,255,0.2)",
                          }}
                        >
                          Booking #{booking.id} · Booked {bookedOn}
                        </span>
                      </div>

                      {/* Event title */}
                      <h3
                        onClick={() => navigate(`/events/${booking.eventId}`)}
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 22,
                          fontWeight: 700,
                          color: "#fff",
                          marginBottom: 16,
                          cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#e8c97e")}
                        onMouseOut={(e) => (e.target.style.color = "#fff")}
                      >
                        {booking.eventTitle}
                      </h3>

                      {/* Details row */}
                      <div
                        style={{ display: "flex", gap: 32, flexWrap: "wrap" }}
                      >
                        {[
                          { icon: "📅", value: formattedDate },
                          {
                            icon: "📍",
                            value: booking.eventVenue || "See event details",
                          },
                          { icon: "🎟️", value: `Ticket #${booking.id}` },
                        ].map((item) => (
                          <div
                            key={item.value}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <span style={{ fontSize: 12, opacity: 0.5 }}>
                              {item.icon}
                            </span>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                color: "rgba(255,255,255,0.4)",
                                fontWeight: 300,
                              }}
                            >
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cancel button */}
                    {isConfirmed && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancelling === booking.id}
                        style={{
                          background: "none",
                          border: "1px solid rgba(248,113,113,0.25)",
                          color: "#f87171",
                          padding: "9px 20px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          opacity: cancelling === booking.id ? 0.5 : 1,
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(248,113,113,0.08)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "none")
                        }
                      >
                        {cancelling === booking.id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;
