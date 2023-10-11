import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";

import '../App.css';

function FilmDetail({onInfo}) {
  const [film, setFilm] = useState(null);
  const [count, setCount] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  const user_id = sessionStorage.getItem("user_id");

  const [ticketBooked, setTicketBooked] = useState(true);
  
  
    if (!user_id) {
      navigate('/clientlogin')
      // return <Link to = '/clientlogin'>Login or Signup to Proceed</Link>
    } else {
    useEffect(() => {
    fetch(`/films/${id}`)
      .then((r) => r.json())
      .then((filmData) => {
        setFilm(filmData);
        // console.log(filmData);
        if (filmData != null) {
          setCount(filmData.tickets_available)
        }
      });
  }, [id, ticketBooked]);
}

  const handleClick = () => {
    if (count !== 0) {
      fetch(`/films/${id}`, {
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
          console.log('butter');
          console.log(data);
          console.log('butter');
          // Update the film state with the new data received
          setTicketBooked(!ticketBooked)
          console.log('info');
          let passedInfo = ({name: data.name, theatre: data.theatres.name, 
            screening_time: data.screening_time, duration: data.duration});
          onInfo(passedInfo)
          console.log('info');
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