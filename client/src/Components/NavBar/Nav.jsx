import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { filterZA, filterAZ, orderHeightMax, orderHeightMim, orderWeightMax, orderWeightMim,
   getDogs, getTemperament, filterTemp } from "../../Actions/index";
import { useEffect, useState } from "react";
import S from'./nav.module.css'

export default function Nav() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('')
  const [filter,setFilter] = useState('')

  const temps = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperament())
    if(filter !== '-'){
      dispatch(filterTemp(filter))
      
    }else{
      console.log('PITULIN ENTRO A LA SALA')
      dispatch(getDogs())
    }   
  },[dispatch, filter])

  useEffect(() => {
    if(order === 'order') dispatch(getDogs())
    if(order === "Z-A") dispatch(filterZA())
    if(order === "A-Z") dispatch(filterAZ())
    if(order === "heigthMay") dispatch(orderHeightMax())
    if(order === "heigthMin") dispatch(orderHeightMim())
    if(order === "weigthMay") dispatch(orderWeightMax())
    if(order === "weigthMin") dispatch(orderWeightMim())
  }, [dispatch,order]);

  function HundleOnchangeOrder(e) {
    setOrder(e.target.value)
  }

  function HundleOnchangeFilter(e) {
    setFilter(e.target.value)
  }
  return (
      <div className= {S.navbar}>
          <NavLink exact to="/Home" className={S.link}>
            <h4>Home</h4>
          </NavLink>        
          <Link to='/Create'className={S.link}>Create</Link>
        <div>
          <select className={S.selecte} onChange={e => HundleOnchangeOrder(e)} > 
            <option className={S.option} value='order'>Order</option>      
            <option className={S.option}value="A-Z">A-Z</option>
            <option className={S.option}value="Z-A">Z-A</option>
            <option className={S.option}value="heigthMay">Heigth higher</option>
            <option className={S.option}value="heigthMin">Heigth less</option>
            <option className={S.option}value="weigthMay">Weigth higher</option>
            <option className={S.option}value="weigthMin" >Weigth less</option>       
          </select>
        </div>
        <div>
          <select className={S.selecte} onChange={e => HundleOnchangeFilter(e)}>
            <option value="-">Temperaments</option>
            {temps &&
              temps.map((e) => {
                return <option className={S.option}key={e.id} value={e.name}>{e.name}</option>;
              })}
          </select>
        </div>     
        <SearchBar />
      </div>   
  );
}
