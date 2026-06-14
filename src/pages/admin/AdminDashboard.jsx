import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, eventsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/admin/events"),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setEvents(eventsRes.data);
    } catch {
      console.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchAll();
    } catch {
      alert("Delete failed.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/admin/events/${eventId}`);
      fetchAll();
    } catch {
      alert("Delete failed.");
    }
  };

  const TABS = ["overview", "users", "events"];

  const ROLE_COLORS = {
    ADMIN: { color: "#f87171", border: "rgba(248,113,113,0.3)" },
    ORGANIZER: { color: "#818cf8", border: "rgba(129,140,248,0.3)" },
    ATTENDEE: { color: "#4ade80", border: "rgba(74,222,128,0.3)" },
  };

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
              Admin Panel
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
              marginBottom: 48,
            }}
          >
            Platform{" "}
            <em style={{ fontStyle: "italic", color: "#e8c97e" }}>Control</em>
          </h1>

          {/* Stats */}
          {stats && (
            <div style={{ display: "flex", gap: 5, textAlign:"center", }}>
              {[
                { label: "Total Users", value: stats.totalUsers, icon: "👥" },
                { label: "Total Events", value: stats.totalEvents, icon: "🎯" },
                {
                  label: "Total Bookings",
                  value: stats.totalBookings,
                  icon: "🎟️",
                },
                {
                  label: "Confirmed",
                  value: stats.confirmedBookings,
                  icon: "✅",
                },
                {
                  label: "Cancelled",
                  value: stats.cancelledBookings,
                  icon: "❌",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(232,201,126,0.1)",
                    borderLeft:
                      i > 0 ? "none" : "1px solid rgba(232,201,126,0.1)",
                    padding: "20px 24px",
                    flex: 1,
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 8 }}>
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 30,
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
          )}
        </div>
      </div>

      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 56px 80px" }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 40,
            borderBottom: "1px solid rgba(232,201,126,0.1)",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #e8c97e"
                    : "2px solid transparent",
                color: activeTab === tab ? "#e8c97e" : "rgba(255,255,255,0.35)",
                padding: "14px 28px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}
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

        {/* Overview tab */}
        {!loading && activeTab === "overview" && stats && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
          >
            {/* Booking breakdown */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(232,201,126,0.1)",
                padding: "32px",
              }}
            >
              <div
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, #e8c97e, transparent)",
                  marginBottom: 24,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 28,
                }}
              >
                Booking Breakdown
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {[
                  {
                    label: "Confirmed",
                    value: stats.confirmedBookings,
                    total: stats.totalBookings,
                    color: "#4ade80",
                  },
                  {
                    label: "Cancelled",
                    value: stats.cancelledBookings,
                    total: stats.totalBookings,
                    color: "#f87171",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 18,
                          fontWeight: 700,
                          color: item.color,
                        }}
                      >
                        {item.value}
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
                          width: item.total
                            ? `${(item.value / item.total) * 100}%`
                            : "0%",
                          background: item.color,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform summary */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(232,201,126,0.1)",
                borderLeft: "none",
                padding: "32px",
              }}
            >
              <div
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, #e8c97e, transparent)",
                  marginBottom: 24,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 28,
                }}
              >
                Platform Summary
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Registered Users", value: stats.totalUsers },
                  { label: "Active Events", value: stats.totalEvents },
                  { label: "Total Bookings", value: stats.totalBookings },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 0",
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.4)",
                        fontWeight: 300,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#e8c97e",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users tab */}
        {!loading && activeTab === "users" && (
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(232,201,126,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, #e8c97e, transparent)",
              }}
            />

            {/* Header + Search */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                All Users — {users.length} total
              </span>

              {/* Search input */}
              <div style={{ position: "relative", minWidth: 280 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(232,201,126,0.4)",
                    fontSize: 13,
                    pointerEvents: "none",
                  }}
                >
                  ✦
                </span>
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="gold-input"
                  style={{
                    paddingLeft: 34,
                    fontSize: 13,
                    padding: "9px 12px 9px 32px",
                  }}
                />
              </div>
            </div>

            <table className="table-dark">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => {
                    const q = userSearch.toLowerCase();
                    return (
                      user.name?.toLowerCase().includes(q) ||
                      user.email?.toLowerCase().includes(q)
                    );
                  })
                  .map((user) => (
                    <tr key={user.id}>
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
                              width: 32,
                              height: 32,
                              border: "1px solid rgba(232,201,126,0.2)",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(232,201,126,0.06)",
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
                              {user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 14,
                              color: "rgba(255,255,255,0.8)",
                            }}
                          >
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {user.email}
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: ROLE_COLORS[user.role]?.color || "#fff",
                            border: `1px solid ${ROLE_COLORS[user.role]?.border || "rgba(255,255,255,0.1)"}`,
                            padding: "3px 10px",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
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
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(248,113,113,0.06)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background = "none")
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                {/* No results */}
                {users.filter((u) => {
                  const q = userSearch.toLowerCase();
                  return (
                    u.name?.toLowerCase().includes(q) ||
                    u.email?.toLowerCase().includes(q)
                  );
                }).length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                      }}
                    >
                      No users found matching "{userSearch}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Events tab */}
        {!loading && activeTab === "events" && (
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(232,201,126,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, #e8c97e, transparent)",
              }}
            />
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                All Events — {events.length} total
              </span>
            </div>
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Format</th>
                  <th>Registrations</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
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
                    </td>
                    <td
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {event.organizerName}
                    </td>
                    <td
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
                    <td
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {event.registeredCount} / {event.capacity}
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
                          onClick={() => handleDeleteEvent(event.id)}
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
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(248,113,113,0.06)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background = "none")
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
