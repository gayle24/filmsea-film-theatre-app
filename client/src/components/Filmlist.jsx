import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link to create links for booking tickets
import '../App.css';

const backgroundStyle = {
  backgroundImage: `url('https://cdn.gencraft.com/prod/user/8b02d5ef-3e8a-4c1e-a4ec-0d1bfc053fc3/9224bb16-9593-4328-b371-d280d2ded984/images/image1_0.jpg?Expires=1696914451&Signature=HUogeiKA0jnkOIbD54ibqrzO68oXDVenHOxqnMtGrRvXsHpExSu7V3V-7xqn1MvLAPi0LfPZ3Z2vXNZuKtTrvZRCmBnjhwYXEw2qQ3v6J6okckclrdqseMXEBaJTgovLJ0hzLv9sOVr9WuyIoSScgvD2J~2oFUP5W1I0~SMrtHK1QF8c8ScUTqE7ewIH93YzuotG6LhkfGQKrUqcm7CMNChNOEu83gQKMxAd2-yOqnyftZ2aJvwh5mOWAwIXQgL5w64xKqmg8Weo0YK8kVWkcP4QgvThvTzLKa-H1AiTHLmFYebuTj5oaKVcie7T7Pzx40THG1IK1aBbmKyjDXHk2w__&Key-Pair-Id=K3RDDB1TZ8BHT8')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 'auto',
  width: 'auto', 
  alignItems: 'initial',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  fontSize: '25px',
  fontFamily: ''
};

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
    <div style={backgroundStyle} className="film-list">
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
