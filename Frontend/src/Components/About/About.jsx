import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>🌍 About MindfulMiles</h1>
      <p>
        MindfulMiles is your personal AI-powered travel companion.  
        We help you design unforgettable journeys by understanding your 
        preferences like <b>budget, time, mood, season, and travel style</b>.  
        Our goal is to make travel planning effortless, personalized, 
        and inspiring.
      </p>

      <div className="about-sections">
        <div className="about-card">
          <h2>💡 Our Mission</h2>
          <p>
            To revolutionize travel planning using artificial intelligence 
            so that everyone can explore the world in their own unique way.
          </p>
        </div>

        <div className="about-card">
          <h2>🤖 Why AI?</h2>
          <p>
            Our AI analyzes your preferences and suggests the best 
            destinations, activities, and experiences that match your vibe.
          </p>
        </div>

        <div className="about-card">
          <h2>✨ What Makes Us Unique</h2>
          <p>
            Unlike generic travel websites, MindfulMiles learns from your 
            choices and provides <b>smart, customized itineraries</b> that 
            truly fit your lifestyle.
          </p>
        </div>
      </div>

      <footer className="about-footer">
        <p>🚀 Start your journey with MindfulMiles today!</p>
      </footer>
    </div>
  );
};

export default About;
