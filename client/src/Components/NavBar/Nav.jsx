import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  filterZA,
  filterAZ,
  orderHeightMax,
  orderHeightMim,
  orderWeightMax,
  orderWeightMim,
  getDogs,
  getTemperament,
  filterTemp,
} from "../../Actions/index";
import { useEffect, useState } from "react";
import S from "./nav.module.css";

export default function Nav({ setCurrentPage, currentPage }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  const temps = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  useEffect(() => {
    if (order === "Z-A") dispatch(filterZA());
    if (order === "A-Z") dispatch(filterAZ());
    if (order === "heigthMay") dispatch(orderHeightMax());
    if (order === "heigthMin") dispatch(orderHeightMim());
    if (order === "weigthMay") dispatch(orderWeightMax());
    if (order === "weigthMin") dispatch(orderWeightMim());
  }, [dispatch, order]);

  function hundleOnchangeOrder(e) {
    e.preventDefault();
    setOrder(e.target.value);
  }

  function hundleOnchangeFilter(e) {
    e.preventDefault();
      // dispatch(getDogs());
      dispatch(filterTemp(e.target.value));
        setCurrentPage(1) 
  }

  function handleClick(e){
    e.preventDefault()
    dispatch(getDogs())
    setCurrentPage(1)
  }

  return (
    <div className={S.navbar}>
      <NavLink to="/Home">
        <button onClick={e => handleClick(e)} className={S.buttonHome}>Home</button>
      </NavLink>
      <NavLink to="/Create">
        <button className={S.buttonHome}>Create</button>
      </NavLink>
      <div>
        <select className={S.selecte} onChange={(e) => hundleOnchangeOrder(e)}>
          <option  className={S.option} hidden selected value="">
            Order
          </option>
          <option className={S.option} value="A-Z">
            A-Z
          </option>
          <option className={S.option} value="Z-A">
            Z-A
          </option>
          <option className={S.option} value="heigthMay">
            Heigth higher
          </option>
          <option className={S.option} value="heigthMin">
            Heigth less
          </option>
          <option className={S.option} value="weigthMay">
            Weigth higher
          </option>
          <option className={S.option} value="weigthMin">
            Weigth less
          </option>
        </select>
      </div>
      <div>
        <select className={S.selecte} onChange={(e) => hundleOnchangeFilter(e)}>
          <option value="all">Temperaments</option>
          {temps &&
            temps.map((e) => {
              return (
                <option className={S.option} key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>
      </div>
      <SearchBar setCurrentPage={setCurrentPage}/>
    </div>
  );
}
