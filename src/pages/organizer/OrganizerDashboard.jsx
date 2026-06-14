import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents, deleteEvent } from "../../api/eventApi";
import { useAuth } from "../../context/AuthContext";

function OrganizerDashboard() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name} 👋</h1>
          <p className="text-purple-200 mb-8">Manage your events from here</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Events", value: events.length, icon: "🎯" },
              { label: "Total Capacity", value: totalCapacity, icon: "👥" },
              { label: "Total Registered", value: totalRegistered, icon: "✅" },
              {
                label: "Available Spots",
                value: totalCapacity - totalRegistered,
                icon: "🎟️",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white bg-opacity-15 backdrop-blur rounded-2xl p-5"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
          <button
            onClick={() => navigate("/organizer/create")}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition shadow-lg shadow-purple-200 flex items-center gap-2"
          >
            + Create New Event
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && events.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No events yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first event to get started
            </p>
            <button
              onClick={() => navigate("/organizer/create")}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition"
            >
              Create Event
            </button>
          </div>
        )}

        {/* Events table */}
        {!loading && events.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Event
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Venue
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Registrations
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
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
                      <tr
                        key={event.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {event.title}
                            </p>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                              {event.category}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-32 truncate">
                          {event.venue}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24">
                              <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${isFull ? "bg-red-500" : "bg-purple-500"}`}
                                  style={{ width: `${fillPercent}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {event.registeredCount}/{event.capacity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              isFull
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {isFull ? "Full" : "Open"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/events/${event.id}`)}
                              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                            >
                              View
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/organizer/edit/${event.id}`)
                              }
                              className="text-xs px-3 py-1.5 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              disabled={deleting === event.id}
                              className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition disabled:opacity-50"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizerDashboard;
