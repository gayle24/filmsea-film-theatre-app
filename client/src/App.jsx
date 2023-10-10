import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import FilmDetail from './components/FilmDetail';
import FilmList from './components/Filmlist';
import LoginSignup from "./components/LoginSignup";
import User from './components/UserProfile';
import Contact from './components/Contact';

function App() {
  const [info, setInfo] = useState({
    name: "",
    theatre: "",
    screening_time: null,
    duration: null
  });

  return (
    <>
      <div className='topnav'>
        <span className='logo'> FilmSea </span>
          <NavLink to={`/`}>Home</NavLink>
          <NavLink to={`/clientfilms`}> FilmHub </NavLink>
          <NavLink to={`/userprofile`}> Profile </NavLink>
          <NavLink to={`/contact`}> Contact Us </NavLink>
        
        
      </div>
      
      <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/clientfilms" element={<FilmList />} />
          <Route onInfo={setInfo} path="/clientfilms/:id" element={<FilmDetail />} />
          <Route info={info} path="/userprofile" element={<User />} />
          <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
