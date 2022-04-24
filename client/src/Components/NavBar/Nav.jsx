import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { filterZA, filterAZ, orderHeightMax, orderHeightMim, orderWeightMax, orderWeightMim,
   getDogs, getTemperament, filterTemp } from "../../Actions/index";
import { useEffect, useState } from "react";


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
      <div>
          <NavLink exact to="/Home" >
            <h4>Home</h4>
          </NavLink>        
          <Link to='/Create'>Crear</Link>
        <div>
          <select  onChange={e => HundleOnchangeOrder(e)} > 
            <option  value='order'>Order</option>      
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="heigthMay">Mas altura</option>
            <option value="heigthMin">Menos altura</option>
            <option value="weigthMay">Mas peso</option>
            <option value="weigthMin" >Menos peso</option>       
          </select>
        </div>
        <div>
          <select  onChange={e => HundleOnchangeFilter(e)}>
            <option value="-">Temperamento</option>
            {temps &&
              temps.map((e) => {
                return <option key={e.id} value={e.name}>{e.name}</option>;
              })}
          </select>
        </div>     
        <SearchBar />
      </div>   
  );
}
