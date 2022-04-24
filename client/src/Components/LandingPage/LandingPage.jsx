import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {

  return (
    <div>
      <Link to="/Home" >
        <h1>Bienvenidos!</h1>
      </Link>
      <img src='https://i.pinimg.com/originals/94/22/ab/9422ab503ad892908134e3e8a711b0c5.gif'/>
    </div>
  );
}
