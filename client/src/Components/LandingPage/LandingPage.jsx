import React from "react";
import { Link } from "react-router-dom";
import S from "./land.module.css"

export default function LandingPage() {

  return (
    <div className={S.background}>
      <Link to="/Home" className={S.link} >
        <h1 className={S.text}>Welcome!</h1>
      </Link>
      <img className={S.image} src='https://i.pinimg.com/originals/94/22/ab/9422ab503ad892908134e3e8a711b0c5.gif'alt=""/>
    </div>
  );
}
