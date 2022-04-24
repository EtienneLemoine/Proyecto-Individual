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
    temperaments: [],
  });

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

  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(sendDogs(objCreate));
    alert("Has creado un perro");
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
      <nav className={S.navbar}>
        <Link to="/Home" className={S.link}>
          <h3 className={S.color}>Home</h3>
        </Link>
      </nav>
      <div className={S.center}>
        <form onSubmit={(e) => HandleSubmit(e)} className={S.flex}>
          <div>
            <label className={S.texts}>
              Name:
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
              Height:
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
              Weight:
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
              Life span:
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

          <button type="submit" className={S.button}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
