import React from "react";
import { getNameDogs } from "../../Actions/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import S from "./search.module.css"

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function HandleChange(e) {
    setInput(e.target.value);
  }

  function HandleSubmit() {
    dispatch(getNameDogs(input));
  }
  return (
    <div className={S.flex}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => HandleChange(e)}
          className = {S.search}
        />

        {input !== "" ? (
          <Link to="/Home/Search">
            <button className={S.button} onClick={() => HandleSubmit()}>Search</button>
          </Link>
        ) : (
          <Link to="/Home">
            <button className={S.button} onClick={() => HandleSubmit()}>Search</button>
          </Link>
        )}
    </div>
  );
}
