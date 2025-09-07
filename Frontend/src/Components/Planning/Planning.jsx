import React, { useState } from "react";
import "./Planning.css";

const Planning = () => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    duration: "",
    mood: "",
    season: "",
    companions: "",
  });

  const [results, setResults] = useState(null); 
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User travel preferences:", formData);

    setLoading(true);

    try {
      // ✅ call FastAPI endpoint
      const response = await fetch("http://127.0.0.1:8000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: formData.budget,
          time: formData.duration, // match FastAPI field
          mood: formData.mood,
        }),
      });

      const data = await response.json();
      setResults(data); // ✅ store backend suggestions
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults({ error: "Failed to fetch travel suggestions. Try again." });
    }

    setLoading(false);
  };

  return (
    <div className="planning-container">
      <h1>✈️ Tell Us About Your Trip</h1>
      <form className="planning-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Budget (₹)</label>
        <input
          type="number"
          name="budget"
          placeholder="Enter your budget"
          value={formData.budget}
          onChange={handleChange}
          required
        />

        <label>Duration (days)</label>
        <input
          type="number"
          name="duration"
          placeholder="How many days?"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <label>Travel Mood</label>
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Mood --</option>
          <option value="adventure">Adventure</option>
          <option value="relax">Relaxation</option>
          <option value="cultural">Cultural</option>
        </select>

        <label>Preferred Season</label>
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Season --</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="monsoon">Monsoon</option>
          <option value="any">Anytime</option>
        </select>

        <label>Traveling With</label>
        <select
          name="companions"
          value={formData.companions}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="solo">Solo</option>
          <option value="friends">Friends</option>
          <option value="family">Family</option>
          <option value="partner">Partner</option>
        </select>

        <button type="submit" className="submit-btn">
          {loading ? "Fetching..." : "Get Suggestions"}
        </button>
      </form>

      {/* ✅ Results Box */}
      {results && (
        <div className="results-box">
          <h2>🌍 Suggested Travel Plan</h2>
          {results.error ? (
            <p style={{ color: "red" }}>{results.error}</p>
          ) : results.places && results.places.length > 0 ? (
            <ul>
              {results.places.map((place, index) => (
                <li key={index}>
                  <strong>{place.name}</strong> – {place.description} ({place.cost})
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found. Try different preferences.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Planning;


