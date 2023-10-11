import { Link, Navigate } from "react-router-dom";
import '../App.css';

const backgroundStyle = {
  backgroundImage: `url('https://images.unsplash.com/photo-1600582910964-5b7c109e6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYWNoJTIwc2FuZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '91vh',
  width: 'auto', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'initial',
  justifyContent: 'center',
  color: 'brown',
  textAlign: 'center',
  fontSize: '25px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontStyle: 'italic',
};

function Home() {
    return (
      <div className="home" style={backgroundStyle}>
        <h1>Welcome to FilmSea</h1>
        <div className="card">
          <p>
            Dive into a sea of breathtaking films
          </p>
          <Link to="/clientfilms">Explore Films</Link>
        </div>
      </div>
    );
  }

export default Home;