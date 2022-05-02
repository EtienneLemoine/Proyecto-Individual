import React from "react";
import S from "./Loading.module.css"

export default function Loading({ setLoading }) {
  return (
    <div className={S.conteiner}>
      <img 
      src="https://media0.giphy.com/media/eYilisUwipOEM/giphy.gif?cid=ecf05e4782ey9hx0bt53d836w6zbkw6yx9oyotv5oeu5e4h0&rid=giphy.gif&ct=g"
      className={S.img}
      />
      <div className={S.content}>
      <h3 className={S.content1}>Loading...</h3>
      </div>
      {setTimeout(() => {
        setLoading(false);
      }, 1600)}
    </div>
  );
}
