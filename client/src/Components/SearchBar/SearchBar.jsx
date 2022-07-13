import React from "react";
import { getNameDogs } from "../../Actions/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import S from "./search.module.css"

export default function Search({setCurrentPage}) {
  const  [loading, setLoading]  = useState(true);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function HandleChange(e) {
    e.preventDefault()
    setInput("")
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
    setInput("")
    }else{
      alert("You must enter a name to search!!")
    }
  }
  return (
    
    <div className={S.flex}>
        <input
          value={input}
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
