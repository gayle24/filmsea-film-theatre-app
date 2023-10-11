import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const backgroundStyle = {
  backgroundImage: `url('https://images.hdqwalls.com/wallpapers/dream-beach-z1.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'initial',
  justifyContent: 'center',
  color: 'white',
  backgroundColor: 'white',
  textAlign: 'center',
  fontSize: '20px',
  width: 'auto',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontStyle: 'italic',
};

export default function Contact(){

    const [theatres, setTheatres] = useState([]);
    const user_id = sessionStorage.getItem("user_id");
  
      if (!user_id) {
        return <Link to = '/login'>Login or Signup to proceed</Link>
      } else {
      useEffect(() => {  
      fetch(`/api/theatres`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch theatre data.");
          }
        })
        .then((data) => {
          setTheatres(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  }
    return (
      <div style={backgroundStyle}className="contact-list">
        <h3>For filmmaker collaboration:</h3>
        <p>Email: filmsea.filmmakers@support.com</p>
        <p>Telephone: (+254)727-252-898</p>
        <br/>
        <h3>Collaborating theatres:</h3>
        {theatres.map((theatre) => (
          <ul key={theatre.id}>
              <li className="title">{theatre.name}</li>
          </ul>
        ))}
      </div>
    );
  }