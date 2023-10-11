import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

  function handleInfo(params){
    alert('data')
    console.log('butter');
    let newInfo = {name: params.name, theatre: params.theatre, 
    screening_time: params.screening_time, duration: params.duration};
    console.log(newInfo);
    setInfo(newInfo);
    console.log('butter');
  }
  
  useEffect(()=>{
    console.log('xxxxxxxxxx');
    console.log(info);
    console.log('yyyyyyyyyy')
  }, [info]);
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
          <Route path="/clientlogin" element={<LoginSignup />} />
          <Route path="/clientfilms" element={<FilmList />} />
          <Route path="/clientfilms/:id" element={<FilmDetail onInfo={handleInfo}/>} />
          <Route path="/userprofile" element={<User info={info}/>} />
          <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
