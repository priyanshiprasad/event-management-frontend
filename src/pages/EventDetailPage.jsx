import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api/eventApi";
import { bookEvent } from "../api/bookingApi";
import { useAuth } from "../context/AuthContext";

function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAttendee } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await getEventById(id);
      setEvent(res.data);
    } catch {
      setError("Failed to load event.");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    setBooking(true);
    setError("");
    setSuccess("");
    try {
      await bookEvent(Number(id));
      setSuccess("Successfully booked! Check My Bookings.");
      setBooked(true);
      fetchEvent();
    } catch (err) {
      setError(err.response?.data?.error || "Booking failed. Try again.");
    } finally {
      setBooking(false);
    }
  };

  const formattedDate = event
    ? new Date(event.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const formattedTime = event
    ? new Date(event.eventDate).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const spotsLeft = event ? event.capacity - event.registeredCount : 0;
  const isFull = spotsLeft <= 0;
  const fillPercent = event
    ? Math.min((event.registeredCount / event.capacity) * 100, 100)
    : 0;

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0608",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner-gold" />
      </div>
    );

  if (!event)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0608",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 64,
            color: "rgba(232,201,126,0.2)",
          }}
        >
          ✦
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Event Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="btn-ghost"
          style={{ marginTop: 8 }}
        >
          Back to Events
        </button>
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0608" }}>
      {/* Hero */}
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
            width: 700,
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
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, maxWidth: 700 }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#e8c97e",
                  border: "1px solid rgba(232,201,126,0.3)",
                  padding: "5px 14px",
                  display: "inline-block",
                  marginBottom: 20,
                }}
              >
                {event.category}
              </span>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                {event.title}
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300,
                }}
              >
                Organized by{" "}
                <span style={{ color: "#e8c97e", fontWeight: 500 }}>
                  {event.organizerName}
                </span>
              </p>
            </div>

            {/* Status badge */}
            <div
              style={{
                border: `1px solid ${isFull ? "rgba(248,113,113,0.4)" : "rgba(74,222,128,0.4)"}`,
                padding: "12px 24px",
                background: isFull
                  ? "rgba(248,113,113,0.06)"
                  : "rgba(74,222,128,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: isFull ? "#f87171" : "#4ade80",
                }}
              >
                {isFull ? "Sold Out" : spotsLeft}
              </div>
              {!isFull && (
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Spots Remaining
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 56px 80px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* About */}
            <div className="card-dark" style={{ padding: "32px", margin: 5 }}>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "#e8c97e",
                  marginBottom: 16,
                }}
              />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                About This Event
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {event.description || "No description provided for this event."}
              </p>
            </div>

            {/* Details */}
            <div className="card-dark" style={{ padding: "32px", margin: 5 }}>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "#e8c97e",
                  marginBottom: 16,
                }}
              />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 24,
                }}
              >
                Event Details
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { icon: "📅", label: "Date", value: formattedDate },
                  { icon: "⏰", label: "Time", value: formattedTime },
                  {
                    icon: event.locationType === "VIRTUAL" ? "💻" : "🗺️",
                    label:
                      event.locationType === "VIRTUAL"
                        ? "Meeting URL"
                        : "Address",
                    value:
                      event.locationType === "VIRTUAL" ? (
                        "Meeting URL is provided in your booking confirmation email."
                      ) : (
                        event.locationDetails || "Not specified"
                      ),
                  },
                  {
                    icon: "👤",
                    label: "Organizer",
                    value: event.organizerName,
                  },
                  { icon: "📧", label: "Contact", value: event.organizerEmail },
                  { icon: "🏷️", label: "Category", value: event.category },
                  {
                    icon: event.locationType === "VIRTUAL" ? "💻" : "📍",
                    label: "Format",
                    value:
                      event.locationType === "VIRTUAL"
                        ? "Virtual Event"
                        : "In Person",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "16px 0",
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        border: "1px solid rgba(232,201,126,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.25)",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: 3,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          color: "rgba(255,255,255,0.75)",
                          fontWeight: 400,
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — booking card */}
          <div
            className="card-dark"
            style={{ padding: "32px", position: "sticky", top: 90, margin: 5 }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: "#e8c97e",
                marginBottom: 16,
              }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 24,
              }}
            >
              Reserve Your Spot
            </h2>

            {/* Capacity */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Capacity
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {event.registeredCount}{" "}
                  <span
                    style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}
                  >
                    / {event.capacity}
                  </span>
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    height: 2,
                    width: `${fillPercent}%`,
                    background: isFull
                      ? "#f87171"
                      : "linear-gradient(90deg, #e8c97e, #f5d98a)",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 8,
                  letterSpacing: "0.06em",
                }}
              >
                {isFull ? "No spots available" : `${spotsLeft} spots remaining`}
              </p>
            </div>

            {/* Messages */}
            {success && (
              <div
                style={{
                  border: "1px solid rgba(74,222,128,0.25)",
                  background: "rgba(74,222,128,0.06)",
                  color: "#4ade80",
                  padding: "12px 14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  marginBottom: 20,
                }}
              >
                ✓ {success}
              </div>
            )}
            {error && (
              <div
                style={{
                  border: "1px solid rgba(248,113,113,0.25)",
                  background: "rgba(248,113,113,0.06)",
                  color: "#f87171",
                  padding: "12px 14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  marginBottom: 20,
                }}
              >
                {error}
              </div>
            )}

            {/* Book button */}
            {isAttendee && (
              <button
                onClick={handleBook}
                disabled={isFull || booking || booked}
                className={isFull || booked ? "btn-ghost" : "btn-primary"}
                style={{
                  width: "100%",
                  textAlign: "center",
                  opacity: isFull || booked ? 0.5 : 1,
                }}
              >
                {booking
                  ? "Booking..."
                  : booked
                    ? "Booked ✓"
                    : isFull
                      ? "Sold Out"
                      : "Book This Event →"}
              </button>
            )}

            {!isAttendee && (
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "14px",
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.06em",
                }}
              >
                Only attendees can book events
              </div>
            )}

            {isAttendee && (
              <button
                onClick={() => navigate("/my-bookings")}
                className="btn-ghost"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 12,
                }}
              >
                View My Bookings
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default EventDetailPage;
