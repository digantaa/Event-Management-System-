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
      <div className='register min-h-screen flex flex-col justify-center items-center bg-gray-50'>
        <h1 className='font-mono text-4xl text-center mb-8'
        >Events</h1>
        <div className="flex items-center justify-center w-full">

        <form
        className='flex flex-col items-center gap-4 border border-gray-300 shadow-lg rounded-3xl p-12 w-full max-w-md bg-white'
        onSubmit={handleSubmit}>
          <input
            className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="text"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            required
          />
          <button type="submit">Add event</button>
        </form>
        </div>
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
