import React from "react";
import { getNameDogs } from "../../Actions/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import S from "./search.module.css"

export default function Search({setCurrentPage}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function HandleChange(e) {
    setInput(e.target.value);
  }

  function handleenter(e) {
    if (e.key === "Enter") {
      HandleSubmit(e);
    }
  };

  function HandleSubmit(e) {
    if(input.length){
    e.preventDefault()
    dispatch(getNameDogs(input));
    setCurrentPage(1)
    document.getElementsByTagName("input")[0].value = "";
    }else{
      alert("404 not fount")
    }
  }
  return (
    
    <div className={S.flex}>
        <input
          type="text"
          placeholder="Search..."
          onKeyPress={handleenter}
          onChange={(e) => HandleChange(e)}
          className = {S.search}
        />

        {input !== "" ? (
          <Link to="/Home/Search">
            <button className={S.button} onClick={(e) => HandleSubmit(e)}>Search</button>
          </Link>
        ) : (
          <Link to="/Home">
            <button className={S.button} onClick={(e) => HandleSubmit(e)}>Search</button>
          </Link>
        )}
    </div>
  );
}
