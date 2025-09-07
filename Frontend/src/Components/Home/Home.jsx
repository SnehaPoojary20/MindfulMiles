import React from 'react';
import { Link } from "react-router-dom";
import About from '../About/About';
import "./Home.css";

const Home = () => {
  return (
    <div className='home'>

      {/* Intro Section */}
      <div className='intro'>
        <h1>
          MindfulMiles <br /><br />
          Your AI guide to unforgettable journeys and perfect travel spots.
        </h1>
      </div>

      {/* Start Planning Section */}
      <div className='startPlanning'>
        <h1>Let’s Design Your Perfect Getaway</h1>
         <Link to="/startPlanning">
          <button type="button" className="planning">Start Planning</button>
        </Link>
      </div>


      <div className='about'>
        <About/>
      </div>
    </div>
  )
}

export default Home;

