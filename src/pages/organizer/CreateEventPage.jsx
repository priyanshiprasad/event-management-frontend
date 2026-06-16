import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventApi";

const CATEGORIES = [
  "CONFERENCE",
  "WORKSHOP",
  "SEMINAR",
  "CONCERT",
  "SPORTS",
  "OTHER",
];

function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    eventDate: "",
    capacity: "",
    category: "",
    customCategory: "",
    locationType: "IN_PERSON",
    locationDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      setError("Please select a category.");
      setLoading(false);
      return;
    }

    // Frontend validation
    if (form.locationType === "IN_PERSON" && !form.locationDetails.trim()) {
      setError("Venue address is required for in-person events.");
      setLoading(false);
      return;
    }
    if (form.locationType === "VIRTUAL" && !form.locationDetails.trim()) {
      setError("Meeting URL is required for virtual events.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        description: form.description,
        venue:
          form.locationType === "IN_PERSON"
            ? form.locationDetails
            : "Virtual Event",
        eventDate: form.eventDate,
        capacity: parseInt(form.capacity),
        category:
          form.category === "OTHER" && form.customCategory.trim()
            ? form.customCategory.trim().toUpperCase()
            : form.category,
        locationType: form.locationType,
        locationDetails: form.locationDetails,
      };
      await createEvent(payload);
      navigate("/organizer");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          JSON.stringify(err.response?.data) ||
          "Failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0608" }}>
      {/* Header */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(232,201,126,0.1)",
          padding: "64px 56px 48px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at top right, rgba(232,201,126,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <button
            onClick={() => navigate("/organizer")}
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
            ← Back to Dashboard
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
              New Event
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
            }}
          >
            Create Your{" "}
            <em style={{ fontStyle: "italic", color: "#e8c97e" }}>Event</em>
          </h1>
        </div>
      </div>

      {/* Form */}
      <div
        style={{ maxWidth: 760, margin: "0 auto", padding: "48px 56px 80px" }}
      >
        {error && (
          <div
            style={{
              border: "1px solid rgba(248,113,113,0.25)",
              background: "rgba(248,113,113,0.06)",
              color: "#f87171",
              padding: "14px 18px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              marginBottom: 32,
            }}
          >
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Event Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="gold-input"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="gold-input"
              placeholder="Describe your event..."
              style={{ resize: "none", fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Date + Capacity */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 28,
            }}
          >
            <div>
              <label style={labelStyle}>Event Date & Time</label>
              <input
                type="datetime-local"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                className="gold-input"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                className="gold-input"
                placeholder="Max attendees"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="gold-select"
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {form.category === "OTHER" && (
              <input
                type="text"
                name="customCategory"
                value={form.customCategory}
                onChange={handleChange}
                className="gold-input"
                placeholder="Enter custom category (e.g. HACKATHON)"
                style={{ marginTop: 10 }}
                required
              />
            )}
          </div>

          {/* Location Type */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Event Format</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {[
                {
                  value: "IN_PERSON",
                  label: "In Person",
                  icon: "📍",
                  desc: "Physical venue location",
                },
                {
                  value: "VIRTUAL",
                  label: "Virtual",
                  icon: "💻",
                  desc: "Online meeting or stream",
                },
              ].map((type) => (
                <label
                  key={type.value}
                  style={{
                    border: `1px solid ${form.locationType === type.value ? "rgba(232,201,126,0.5)" : "rgba(255,255,255,0.08)"}`,
                    background:
                      form.locationType === type.value
                        ? "rgba(232,201,126,0.06)"
                        : "rgba(255,255,255,0.02)",
                    padding: "18px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <input
                    type="radio"
                    name="locationType"
                    value={type.value}
                    checked={form.locationType === type.value}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <span style={{ fontSize: 24 }}>{type.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color:
                          form.locationType === type.value
                            ? "#e8c97e"
                            : "rgba(255,255,255,0.8)",
                        marginBottom: 3,
                      }}
                    >
                      {type.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.3)",
                        fontWeight: 300,
                      }}
                    >
                      {type.desc}
                    </div>
                  </div>
                  {form.locationType === type.value && (
                    <div
                      style={{
                        marginLeft: "auto",
                        width: 18,
                        height: 18,
                        border: "1.5px solid #e8c97e",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#e8c97e",
                        }}
                      />
                    </div>
                  )}
                </label>
              ))}
            </div>

            {/* Location details input */}
            {form.locationType === "IN_PERSON" && (
              <div>
                <label style={{ ...labelStyle, marginBottom: 8 }}>
                  Venue Address
                </label>
                <input
                  type="text"
                  name="locationDetails"
                  value={form.locationDetails}
                  onChange={handleChange}
                  className="gold-input"
                  placeholder="Enter full venue address"
                  required
                />
              </div>
            )}

            {form.locationType === "VIRTUAL" && (
              <div>
                <label style={{ ...labelStyle, marginBottom: 8 }}>
                  Meeting URL
                </label>
                <input
                  type="url"
                  name="locationDetails"
                  value={form.locationDetails}
                  onChange={handleChange}
                  className="gold-input"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  required
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button
              type="button"
              onClick={() => navigate("/organizer")}
              className="btn-ghost"
              style={{ flex: 1, textAlign: "center" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ flex: 1, textAlign: "center" }}
            >
              {loading ? "Creating..." : "Publish Event →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
