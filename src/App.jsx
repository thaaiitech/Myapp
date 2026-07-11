import React, { useState } from "react";
 import "./App.css";
import key from "./assets/key.gif";
 




import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [closed, setClosed] = useState(false);


  const login = async () => {

    if (closed) return;


    const res = await fetch("http://localhost:5000/api/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        password
      })
    });


    const data = await res.json();


    if(data.success){

      alert("WELCOME TO SUCCESS");
     

    }
    else{

      const count = attempts + 1;

      setAttempts(count);


      if(count <= 3){

        setMessage(`Wrong Password - Attempt ${count}/3`);
        
      }


      if(count >= 4){

        setClosed(true);
        setMessage("APPLICATION CLOSED ❌");

      }

    }

  };


  const cancel = () => {

    setUsername("");
    setPassword("");
    setAttempts(0);
    setMessage("");

  };


  return (

    <div className="container">


      <div className="bg-circle one"></div>
      <div className="bg-circle two"></div>


      <div className="login-box">


      {
        closed ?

        <h1 className="closed">
          APPLICATION CLOSED ❌
        </h1>


        :

        <>

        <h1>LOGIN FORM</h1>


        <label>
          Username
        </label>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />


        <label>
          Password
        </label>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <div className="button-group">


          <button 
            className="login-btn"
            onClick={login}
          >
            Login
          </button>


          <button
            className="cancel-btn"
            onClick={cancel}
          >
            Cancel
          </button>


        </div>


        <h3 className="message">
          {message}
        </h3>


        <br/>


        <div className="social-icons">

          <a href="#">
            <FaInstagram/>
          </a>

          <a href="#">
            <FaFacebookF/>
          </a>

          <a href="#">
            <FaWhatsapp/>
          </a>



   

        </div>

        <div className="key-box">
  <img src={key} alt="Key" className="key-img" />
</div>
        

     
        </>

      }


      </div>




    </div>

  );
}

export default App;

