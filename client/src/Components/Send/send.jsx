import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, sendDogs } from "../../Actions/index";
import { Link } from "react-router-dom";
import S from "./send.module.css";
export default function Send() {
  var reg = new RegExp(/[0-9]/g);
  const [temps, setTemps] = useState([]);
  const [objCreate, setObjCreate] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  const dogs = useSelector((state) => state.dogsLoaded);
 
  console.log(dogs)

  const dispatch = useDispatch();
  const temp = useSelector((state) => state.temperaments);

  function HandleChange(e) {

    let temporal = { ...objCreate };

    temporal[e.target.name] = e.target.value;
    setObjCreate(temporal);
  }

  function HandleTemps(e) {
    if (!temps?.includes(e.target.value)) {
      setTemps([...temps, e.target.value]);

      let temporal = { ...objCreate };
      temporal["temperaments"] = [...temporal["temperaments"], e.target.value];
      setObjCreate(temporal);
    }
  }
  console.log(objCreate.height)

  function HandleSubmit(e) {
    let regExp = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
    let expName = /^[a-zA-Z\s]/;
    let expURL = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
    let expNumber = /^[0-9]+$/;
     for(let i = 0; i<dogs.length;i++){
       if(dogs[i].name===objCreate.name){
        e.preventDefault();
        alert(`There is already a dog with the name "${objCreate.name}"`) 
        let volver = window.location = `/Details/${dogs[i].id}`;
        return volver;
       }
     }
     if(objCreate.height > 150 || !expNumber.test(objCreate.height)){
      alert('The value entered in the "height" is invalid')
      e.preventDefault();
     }else if(!expName.test(objCreate.name)){
      alert('The value entered in the "name" is invalid')
      e.preventDefault();
     }else if(objCreate.weight > 150 || !expNumber.test(objCreate.weight)){
      alert('The value entered in the "weight" is invalid')
      e.preventDefault();
     }else if(objCreate.life_span > 100 || !expNumber.test(objCreate.life_span)){
      alert('The value entered in the "Life Span" is invalid')
      e.preventDefault();
     }else if(objCreate.temperaments.length === 0){
      alert('You must enter a temperament!!')
      e.preventDefault();
     }else{
      e.preventDefault();
      dispatch(sendDogs(objCreate));
      alert(`A dog has been created with the name "${objCreate.name}"`)
      window.location = '/Home';
     }
    }

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  function deleteTemperament(e) {
    e.preventDefault()

    let newArr = temps?.filter(x => e.target.value !== x)
    setTemps(newArr)

    let temporal = { ...objCreate };
    temporal["temperaments"] = [...temporal["temperaments"], e.target.value];
    setObjCreate(temporal);
      
  }
  return (
    <div>
      <div className={S.navbar}>
        <Link to="/Home" className={S.link}>
        <button className={S.buttonHome}>Home</button>
        </Link>
      </div>
      <div className={S.center}>
        <form onSubmit={(e) => HandleSubmit(e)} className={S.flex}>
          <div>
            <label className={S.texts}>
              Name 📍:
              <input
                type="text"
                name="name"
                value={objCreate.name}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Height 📍: {objCreate.height}
              <input
                type="range" min="1" max="150" id="slider"
                name="height"
                value={objCreate.height}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Weight 📍: {objCreate.weight}
              <input
                type="range" min="1" max="150" id="slider"
                name="weight"
                value={objCreate.weight}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Life span 📍: {objCreate.life_span}
              <input
                type="range" min="1" max="100" id="slider"
                name="life_span"
                value={objCreate.life_span}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Image (URL) 📍:
              <input
                type="text"
                name="image"
                value={objCreate.image}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Temperament: 
            </label>
            <div className={S.allTemps}>
              {temps?.map((e) => {
                  return (<button key={e} className={S.listTemp} value={e} onClick={(e) =>deleteTemperament(e)}>{e} </button>)
                })}
            </div>
            <select onChange={(e) => HandleTemps(e)}>
              <option>-</option>
              {temp &&
                temp
                  .slice()
                  .sort()
                  .map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
            </select>
          </div>
          
          <button type="submit" className={S.buttonHome} disabled={!objCreate.name || !objCreate.weight || !objCreate.height ||!objCreate.life_span||!objCreate.image }>
            Create
          </button>
          
        </form>
      </div>
    </div>
  );
}
