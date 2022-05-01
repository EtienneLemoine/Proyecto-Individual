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

    if (e.target.name !== "name") {
      if (reg.test(e.target.value)) {
        let temporal = { ...objCreate };

        temporal[e.target.name] = e.target.value;
        setObjCreate(temporal);
      } else {
        return alert("No ingreso un numero");
      }
    }

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
   for(let i = 0; i<dogs.length;i++){
     if(dogs[i].name===objCreate.name){
      e.preventDefault();
      alert(`There is already a dog with the name "${objCreate.name}"`) 
     }
   }
   if(objCreate.height > 150){
    alert('The value entered in the "height" is invalid')
    e.preventDefault();
   }else if(objCreate.weight > 150){
    alert('The value entered in the "weight" is invalid')
    e.preventDefault();
   }else if(objCreate.life_span.length > 2){
    alert('The value entered in the "Life Span" is invalid')
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
              Height 📍:
              <input
                type="text"
                name="height"
                value={objCreate.height}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Weight 📍:
              <input
                type="text"
                name="weight"
                value={objCreate.weight}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Life span 📍:
              <input
                type="text"
                name="life_span"
                value={objCreate.life_span}
                onChange={(e) => HandleChange(e)}
              />
            </label>
          </div>
          <div>
            <label className={S.texts}>
              Image 📍:
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
