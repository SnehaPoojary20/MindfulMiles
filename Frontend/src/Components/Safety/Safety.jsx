import React, { useState } from "react";
import "./Safety.css";

const Safety = () => {
  const [city, setCity] = useState("");
  const [safety, setSafety] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSafety = async () => {
    if (!city) return;
    setLoading(true);
    setSafety(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/safety/${city}`);
      const data = await res.json();
      setSafety(data);
    } catch (err) {
      console.error("Error fetching safety:", err);
      setSafety({ city, safety_status: "Unknown" });
    } finally {
      setLoading(false);
    }
  };

  // Map string status to CSS class
  const getSafetyClass = (status) => {
    switch (status) {
      case "Safe":
        return "safety-good";
      case "Neutral":
        return "safety-medium";
      case "Unsafe":
        return "safety-bad";
      default:
        return "safety-unknown";
    }
  };

  return (
    <div className="safety-container">
      <h1>How Safe Is Your Next Destination?</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Enter city name (e.g., Paris)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchSafety} className="">Check Safety</button>
      </div>

      <div className="results-container">
        {loading ? (
          <p>Fetching safety info...</p>
        ) : safety ? (
          <div className="place-card">
            <h2>{safety.city}</h2>
            <p className={`safety-score ${getSafetyClass(safety.safety_status)}`}>
              {safety.safety_status}
            </p>
          </div>
        ) : (
          <h3>Enter a city to check its safety.</h3>
        )}
      </div>
    </div>
  );
};

export default Safety;

