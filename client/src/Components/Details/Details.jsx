import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdDogs } from "../../Actions/index";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Details() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.dogDetails);

  let { id } = useParams();

  useEffect(() => {
    dispatch(getIdDogs(id));
  }, [id]);

  return (
    <div >
      <nav >
        <Link to="/Home" ><h3>Home</h3></Link>
      </nav>
      <div >
        <div>
          {detail.image ? (
            <img src={detail.image}  />
          ) : (
            <img
              src="https://us.123rf.com/450wm/damedeeso/damedeeso1509/damedeeso150900033/44964439-trabajador-perro-manitas-con-el-casco-y-el-martillo-en-la-boca-listo-para-reparar-arreglar-todo-en-c.jpg?ver=6"
            />
          )}
          <h3 >{detail.name}</h3>
        </div>
        <div >
          <div >
            <h5>Altura: </h5>
            <h5 > {' '+detail.height} CM</h5>
          </div>
          
          <div >
            <h5>Peso: </h5>
            <h5 > {' '+detail.weight} Kg</h5>
          </div>
          
          <div >
            <h5>Esperanza de vida: </h5>
            <h5 > {' '+detail.life_span} Años</h5>
          </div>
          
          <div >
            <h5>Temperamento: </h5>
            <h5>
              {detail.temperaments
              ? typeof detail.temperaments === "object"
                ? detail.temperaments.map((e) => {
                    if (e) {
                      return "  " + e
                    }
                  })
                : detail.temperaments.map((e) => {
                    if (e) {
                      return " " + e.name
                    }
                  })
              : "Not fount"}
            </h5>
          </div>
          
        </div>
      </div>
    </div>
  );
}
