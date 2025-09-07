import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './Components/Home/Home';
import Planning from './Components/Planning/Planning';
import Footer from './Components/Footer/Footer';


function App() {
  

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/startPlanning"  element={<Planning />}/>
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App;


  // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>

