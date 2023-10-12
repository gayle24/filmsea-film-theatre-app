// LoginSignupPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

const respStyle = {
  color: 'black'
}

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
  color: 'white',
  textAlign: 'center',
  fontSize: '25px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontStyle: 'italic',
};

function LoginSignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  

  const handleLogin = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          // Set user session in the frontend
          sessionStorage.setItem("user_id", data.user_id);
          console.log(data);
          setResponse(<Link to={'/'}>Proceed to Homepage</Link>)
        } else {
          // Handle login error
          console.error("Login failed");
          setResponse("Login failed: Invalid username or password")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Similar logic for handling signup
  const handleSignup = () => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "New user created") {
          // Set user session in the frontend
          console.log(data);
          sessionStorage.setItem("user_id", data.user_id); // Store user_id in session storage
          setResponse(<Link to={'/'}>Proceed to Homepage</Link>)
        } else {
          // Handle login error
          console.error("Signup failed: invalid data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={backgroundStyle} className="login">
      <h2>Login or Signup</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button onClick={handleLogin}>Login</button><br/>
        <p>Or</p>
        <button onClick={handleSignup}>Signup</button>
      </div>
      <p style={respStyle}>{response}</p>
    </div>
  );
}

export default LoginSignupPage;
