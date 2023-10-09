import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import '../App.css';


function FilmDetail({ setInfo }) {
  const [film, setFilm] = useState(null);
  const [count, setCount] = useState(null);
  const { id } = useParams();
  const user_id = sessionStorage.getItem("user_id");
  
  
    if (!user_id) {
      <Navigate to ='/login' replace = '/' />
      return <Link to = '/login'>Login or Signup to Proceed</Link>
    } else {
    useEffect(() => {
    fetch(`/api/films/${id}`)
      .then((r) => r.json())
      .then((filmData) => {
        setFilm(filmData);
        console.log(filmData);
        if (filmData != null) {
          setCount(filmData.tickets_available)
        }
      });
  }, [id]);
}

  const handleClick = () => {
    if (count !== 0) {
      fetch(`/api/films/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PATCH",     
   
        // Fields that to be updated are passed
        body: JSON.stringify({
          tickets_available: count - 1
        })
      })
        .then((response) =>response.json())
        .then((data) =>{
          console.log(data);
          // Update the film state with the new data received
          location.reload();
          setInfo({name: data.name, theatre: data.theatres.name, 
            screening_time: data.screening_time, duration: data.duration})
          setCount(data.tickets_available);
        });
    }
  };
  


  return (
    <section className="detail-card">
      {film ? (
        <>
          <img src={film.image_url} alt={film.name} className="film-image" />
          <p>{film.name}</p>
          <p>Filmmaker: {film.filmmakers.name}</p>
          <p>Theatre: {film.theatres.name}</p>
          <button className="book-ticket-button" onClick={handleClick}
            disabled={film.tickets_available === 0}>
            {film.tickets_available === 0
              ? "No tickets remaining"
              : `Tickets available: ${film.tickets_available} | Book Ticket`}
          </button>
          <p><Link to={`/clientfilms`}>Return to Films List</Link></p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
export default FilmDetail;