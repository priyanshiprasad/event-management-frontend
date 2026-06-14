import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEvents,
  searchEvents,
  getEventsByCategory,
} from "../api/eventApi";

const CATEGORIES = [
  "ALL",
  "WEBINAR",
  "CONFERENCE",
  "WORKSHOP",
  "SEMINAR",
  "CONCERT",
  "SPORTS",
];

const CATEGORY_ICONS = {
  ALL: "✦",
  WEBINAR: "💻",
  CONFERENCE: "🎤",
  WORKSHOP: "🛠️",
  SEMINAR: "📚",
  CONCERT: "🎵",
  SPORTS: "⚽",
};

function EventCard({ event, onClick }) {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const spotsLeft = event.capacity - event.registeredCount;
  const isFull = spotsLeft <= 0;
  const fillPercent = Math.min(
    (event.registeredCount / event.capacity) * 100,
    100,
  );

  return (
    <div
      onClick={onClick}
      className="card-dark"
      style={{
        cursor: "pointer",
        overflow: "hidden",
        animation: "fadeUp 0.5s ease forwards",
      }}
    >
      {/* Gold top bar */}
      <div
        style={{
          height: 2,
          background: "linear-gradient(90deg, #e8c97e, transparent)",
        }}
      />

      <div style={{ padding: "24px" }}>
        {/* Category + status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e8c97e",
              border: "1px solid rgba(232,201,126,0.25)",
              padding: "4px 10px",
            }}
          >
            {CATEGORY_ICONS[event.category] || "✦"} {event.category}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.1em",
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
                boxShadow: isFull ? "0 0 6px #f87171" : "0 0 6px #4ade80",
                display: "inline-block",
              }}
            />
            {isFull ? "Sold Out" : "Available"}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 10,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7,
            marginBottom: 20,
            fontWeight: 300,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description || "No description provided."}
        </p>

        {/* Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 20,
          }}
        >
          {[
            { icon: "📅", value: `${formattedDate} · ${formattedTime}` },
            {
              icon: "📍",
              value: event.locationDetails || "Location not specified",
            },
            { icon: "👤", value: event.organizerName },
          ].map((item) => (
            <div
              key={item.icon}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 12, opacity: 0.6 }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 300,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(232,201,126,0.08)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: isFull ? "#f87171" : "#e8c97e",
              }}
            >
              {spotsLeft}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                marginLeft: 6,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              spots left
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: 80 }}>
            <div
              style={{
                width: "100%",
                height: 2,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  height: 2,
                  width: `${fillPercent}%`,
                  background: isFull
                    ? "#f87171"
                    : "linear-gradient(90deg, #e8c97e, #f5d98a)",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getAllEvents();
      setEvents(res.data);
    } catch {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedCategory("ALL");
    if (value.trim() === "") {
      fetchEvents();
      return;
    }
    try {
      const res = await searchEvents(value);
      setEvents(res.data);
    } catch {
      setError("Search failed.");
    }
  };

  const handleCategory = async (cat) => {
    setSelectedCategory(cat);
    setSearch("");
    if (cat === "ALL") {
      fetchEvents();
      return;
    }
    try {
      setLoading(true);
      const res = await getEventsByCategory(cat);
      setEvents(res.data);
    } catch {
      setError("Filter failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0608" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(232,201,126,0.1)",
          padding: "80px 56px 64px",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse at top right, rgba(232,201,126,0.06) 0%, transparent 65%)",
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
              "radial-gradient(ellipse at bottom left, rgba(139,62,30,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
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
              Discover Events
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Find Your Next
            <br />
            <em style={{ fontStyle: "italic", color: "#e8c97e" }}>
              Experience
            </em>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 40,
            }}
          >
            Browse hundreds of curated events — from intimate workshops to grand
            concerts.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 560 }}>
            <span
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(232,201,126,0.5)",
                fontSize: 16,
              }}
            >
              ✦
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search events by name..."
              className="gold-input"
              style={{ paddingLeft: 44, fontSize: 14 }}
            />
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 56px 80px" }}
      >
        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "8px 20px",
                cursor: "pointer",
                border:
                  selectedCategory === cat
                    ? "1px solid rgba(232,201,126,0.6)"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  selectedCategory === cat
                    ? "rgba(232,201,126,0.1)"
                    : "transparent",
                color:
                  selectedCategory === cat
                    ? "#e8c97e"
                    : "rgba(255,255,255,0.4)",
                transition: "all 0.2s",
              }}
            >
              {CATEGORY_ICONS[cat]} {cat === "ALL" ? "All Events" : cat}
            </button>
          ))}
        </div>

        {/* Count */}
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
            {events.length} {events.length === 1 ? "Event" : "Events"} Found
            {selectedCategory !== "ALL" && ` · ${selectedCategory}`}
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
            <button
              onClick={fetchEvents}
              style={{
                marginTop: 16,
                color: "#e8c97e",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 64,
                marginBottom: 20,
                opacity: 0.3,
              }}
            >
              ✦
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 10,
              }}
            >
              No Events Found
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.25)",
                fontWeight: 300,
              }}
            >
              Try a different search or category
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && events.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 10,
            }}
          >
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
