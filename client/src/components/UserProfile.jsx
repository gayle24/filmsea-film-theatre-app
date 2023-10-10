import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

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
    height: '91vh',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontStyle: 'italic',
  };

function User({ info }){
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      <Navigate to ='/login' replace = '/' />
      return <Link to = '/login'>Login or Signup to Proceed</Link>
    } else {

    // add logout code here with a button for logging out and on clicking
    // it should delete the session and reload the page so that it brings the link to
    // the login/signup page
   const handleClick = ()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
    }


    return (
    <div style={backgroundStyle}>
        <h3>Welcome to your User Profile Page</h3>
        <p>Booked Tickets:</p>
        {info && (
        <div>
            <p>Film Title: {info.name}</p>
            <p>Theatre: {info.theatre}</p>
            <p>Screening time: {info.screening_time}</p>
            <p>Duration: {info.duration}</p>
        </div>
        )}

        <button onClick={handleClick}>Log out</button>
    </div>  
 );
}
}

export default User;