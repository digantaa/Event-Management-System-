import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Trash2, Search } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    status: "",
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(text || "Unexpected non-JSON response from server");
        }
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.message || "Failed to load events");
        }
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(text || "Unexpected non-JSON response from server");
        }
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Failed to add event");
        }
        return data;
      })
      .then((newEvent) => {
        setEvents([...events, newEvent]);
        setForm({ title: "", date: "", location: "", status: "" });
      })
      .catch((err) => console.error("Error adding event:", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`${API_URL}/events/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");
        setEvents(events.filter((event) => event._id !== id));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status.trim().toLowerCase()) {
      case "upcoming":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      case "ongoing":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
      case "completed":
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white";
      case "postponed":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{backgroundColor:'#F08080'}} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent py-2 mb-2">
            Event Management
          </h1>
          <p className="text-gray-600">
            Manage and track all your events in one place
          </p>
        </div>

        {/* Form + Search */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
          {/* Form */}
          <form
            className="flex flex-col gap-4 border border-gray-300 shadow-lg rounded-2xl p-6 bg-white max-w-lg w-full"
            onSubmit={handleSubmit}
          >
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-xl"
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-xl"
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-xl"
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 px-4 py-2 rounded-xl"
            >
              <option value="">Select Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Postponed">Postponed</option>
            </select>

            <button
              className="font-mono text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
              focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-sm px-5 py-3 text-center"
              type="submit"
            >
              Add Event
            </button>
          </form>

         
          </div>
           {/* Search Box */}
          <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-md px-4 py-2 mb-3 w-full max-w-sm justify-center">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-gray-700"
            />
        </div>

        {/* Event List */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Events Found
            </h3>
            <p className="text-gray-500 text-lg">
              Try searching or create a new event!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEvents.map((event, index) => {
                    const { date, time } = formatDate(event.date);
                    return (
                      <tr
                        key={event._id}
                        className="hover:bg-blue-50 transition-all duration-200"
                      >
                        <td className="px-6 py-5">{index + 1}</td>
                        <td className="px-6 py-5 font-semibold text-gray-900">
                          {event.title}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {date}
                              </div>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {time}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <div className="text-sm font-medium text-gray-900">
                              {event.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span
                            className={`px-4 py-2 inline-flex items-center text-xs font-bold rounded-full shadow-sm ${getStatusColor(
                              event.status
                            )}`}
                          >
                            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Delete Event"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="mt-6 flex justify-center">
          <button
            className="font-mono text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
              focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg text-sm px-5 py-3 text-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
