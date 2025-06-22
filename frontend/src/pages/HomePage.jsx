import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    leave: '',
    return: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const query = `from=${form.origin}&to=${form.destination}&depart=${form.leave}&ret=${form.return}`;
    navigate(`/flights?${query}`);
  };

  return (
    <div className="home-container">
      <h1>Flight Booking</h1>

      <div className="search-grid">
        <div className="search-item">
          <label>Origin</label>
          <input
            type="text"
            name="origin"
            placeholder="Enter Country"
            value={form.origin}
            onChange={handleChange}
            dir="ltr"
          />
        </div>
        <div className="search-item">
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            placeholder="Enter Country"
            value={form.destination}
            onChange={handleChange}
            dir="ltr"
          />
        </div>
        <div className="search-item">
          <label>Leave Date</label>
          <input
            type="date"
            name="leave"
            value={form.leave}
            onChange={handleChange}
          />
        </div>
        <div className="search-item">
          <label>Return Date</label>
          <input
            type="date"
            name="return"
            value={form.return}
            onChange={handleChange}
          />
        </div>
        <div className="search-item full-height">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}
