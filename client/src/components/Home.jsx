import { Link, Navigate } from "react-router-dom";
import '../App.css';

const backgroundStyle = {
  backgroundImage: `url('https://cdn.gencraft.com/prod/user/8b02d5ef-3e8a-4c1e-a4ec-0d1bfc053fc3/f997ee8d-5217-404e-9264-369a74587921/images/image1_0.jpg?Expires=1696911225&Signature=H3nlWMDqcPyVXxS1ecNgzSi5elNUQPAOCy3D1gRanJhbN~EeVpgck53D1DLyjIPKKhD09ZuZZsJt9c9JoGHBRDh1IPh3hfIT8LsNGJmV163roVNhYmv2XPh5-VU-VmSfTKv1C0srw~3dJYCVits9sYhM5H-xuJ1owNu5nXAsyM~gyjvBcRuSX2AbrgHQ74rePUNRjxPd8a7Kn1Bp8CrtJJHEmQNZQTXWsGTABWrd7IblsFY1X8anN~nKXQRZik~INzCzP~HtH8zu-DAHcyYeG0z1yRnamMjW6VjLaZTIjs6U2NNrtSUbd6OBaVeid3OtcWgdO1RAsnQRUao2wO3MKQ__&Key-Pair-Id=K3RDDB1TZ8BHT8')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'initial',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  fontSize: '25px',
  fontFamily: ''
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