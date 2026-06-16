import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents, deleteEvent } from "../../api/eventApi";
import { useAuth } from "../../context/AuthContext";

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await getMyEvents();
      setEvents(res.data);
    } catch {
      console.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeleting(id);
    try {
      await deleteEvent(id);
      fetchMyEvents();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const totalRegistered = events.reduce((sum, e) => sum + e.registeredCount, 0);

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
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse at top right, rgba(232,201,126,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 400,
            height: 300,
            background:
              "radial-gradient(ellipse at bottom left, rgba(139,62,30,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
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
              Organizer Panel
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Welcome,{" "}
                <em style={{ fontStyle: "italic", color: "#e8c97e" }}>
                  {user?.name}
                </em>
              </h1>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 8,
                  fontWeight: 300,
                }}
              >
                Manage and track all your events from here
              </p>
            </div>
            <button
              onClick={() => navigate("/organizer/create")}
              className="btn-primary"
            >
              + Create New Event
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 10, textAlign: "center" }}>
            {[
              { label: "Total Events", value: events.length, icon: "🎯" },
              { label: "Registered", value: totalRegistered, icon: "✅" },
              {
                label: "Available Spots",
                value: totalCapacity - totalRegistered,
                icon: "🎟️",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(232,201,126,0.1)",
                  borderLeft:
                    i > 0 ? "none" : "1px solid rgba(232,201,126,0.1)",
                  padding: "20px 28px",
                  flex: 1,
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 8 }}>{stat.icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#e8c97e",
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
        style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 56px 80px" }}
      >
        {/* Section title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 32,
              height: 1,
              background: "rgba(232,201,126,0.3)",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Your Events
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }}
          />
        </div>

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

        {/* Empty */}
        {!loading && events.length === 0 && (
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
              No Events Yet
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
              Create your first event to get started
            </p>
            <button
              onClick={() => navigate("/organizer/create")}
              className="btn-primary"
            >
              Create Event →
            </button>
          </div>
        )}

        {/* Events table */}
        {!loading && events.length > 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(232,201,126,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, #e8c97e, transparent)",
              }}
            />
            <table className="table-dark" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Format</th>
                  <th>Registrations</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const spotsLeft = event.capacity - event.registeredCount;
                  const isFull = spotsLeft <= 0;
                  const fillPercent = Math.min(
                    (event.registeredCount / event.capacity) * 100,
                    100,
                  );
                  const date = new Date(event.eventDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  );

                  return (
                    <tr key={event.id}>
                      <td>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: 15,
                              fontWeight: 700,
                              color: "#fff",
                              marginBottom: 4,
                            }}
                          >
                            {event.title}
                          </p>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 10,
                              color: "#e8c97e",
                              border: "1px solid rgba(232,201,126,0.2)",
                              padding: "2px 8px",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {event.category}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                        }}
                      >
                        {date}
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            color:
                              event.locationType === "VIRTUAL"
                                ? "#818cf8"
                                : "#4ade80",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {event.locationType === "VIRTUAL"
                            ? "💻 Virtual"
                            : event.locationType === "IN_PERSON"
                              ? "📍 In Person"
                              : "📍 In Person"}
                        </span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 80,
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
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 12,
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            {event.registeredCount}/{event.capacity}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: isFull ? "#f87171" : "#4ade80",
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
                              background: isFull ? "#f87171" : "#4ade80",
                              display: "inline-block",
                            }}
                          />
                          {isFull ? "Full" : "Open"}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => navigate(`/events/${event.id}`)}
                            style={{
                              background: "none",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.5)",
                              padding: "6px 14px",
                              cursor: "pointer",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 11,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.borderColor =
                                "rgba(255,255,255,0.3)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.borderColor =
                                "rgba(255,255,255,0.1)")
                            }
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/organizer/edit/${event.id}`)
                            }
                            style={{
                              background: "none",
                              border: "1px solid rgba(232,201,126,0.2)",
                              color: "#e8c97e",
                              padding: "6px 14px",
                              cursor: "pointer",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 11,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.borderColor =
                                "rgba(232,201,126,0.5)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.borderColor =
                                "rgba(232,201,126,0.2)")
                            }
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            disabled={deleting === event.id}
                            style={{
                              background: "none",
                              border: "1px solid rgba(248,113,113,0.2)",
                              color: "#f87171",
                              padding: "6px 14px",
                              cursor: "pointer",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 11,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              transition: "all 0.2s",
                              opacity: deleting === event.id ? 0.5 : 1,
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(248,113,113,0.06)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = "none")
                            }
                          >
                            {deleting === event.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEventsPage;
