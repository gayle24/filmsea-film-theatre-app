import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";


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
    <div>
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