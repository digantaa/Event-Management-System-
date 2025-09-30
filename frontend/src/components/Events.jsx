import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    status: "",
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.placeholder.toLowerCase()]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newEvent) => {
        setEvents([...events, newEvent]);
        setForm({ title: "", date: "", location: "", status: "" });
      })
      .catch((err) => console.error("Error adding event:", err));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title && event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Events</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="Location">Location</label>
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <label htmlFor="status">Status</label>
          <input
            type="text"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            required
          />
          <button type="submit">Add event</button>
        </form>
      </div>
      <div>
        <h2>Event List</h2>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "1em", padding: "0.5em", width: "100%" }}
        />
        <ul>
          {filteredEvents.map((event, idx) => (
            <li key={idx}>
              <strong>{event.title}</strong> | {event.date} | {event.location} |{" "}
              {event.status}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Events;
