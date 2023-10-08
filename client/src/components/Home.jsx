import { Link, Navigate } from "react-router-dom";

function Home() {
    return (
      <>
        <h1>Welcome to FilmSea</h1>
        <div className="card">
          <p>
            Dive into a sea of breathtaking films
          </p>
          <Link to="/clientfilms">Explore Films</Link>
        </div>
      </>
    );
  }

export default Home;