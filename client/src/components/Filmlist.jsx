import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link to create links for booking tickets
import '../App.css';

function FilmList() {
  const [films, setFilms] = useState([]);
  const user_id = sessionStorage.getItem("user_id");

    if (!user_id) {
      return <Link to = '/login'>Login or Signup to proceed</Link>
    } else {
    useEffect(() => {  
    fetch(`/api/films`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch film data.");
        }
      })
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
}
  return (
    <div className="film-list">
      {films.map((film) => (
        <div className="film-card" key={film.id}>
          <img src={film.image_url} alt={film.name} className="film-image" />
          <div className="film-info">
            <h2 className="film-title">{film.name}</h2>
            <p className="film-duration">Duration: {film.duration} minutes</p>
            <p className="tickets-remaining">Tickets remaining: {film.tickets_available}</p>
            <Link to={`/clientfilms/${film.id}`} className="book-ticket-button">Book Ticket</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilmList;
