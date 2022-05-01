import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdDogs } from "../../Actions/index";
import { useParams } from "react-router";
import S from "./detail.module.css";


export default function Details() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.dogDetails);

  let { id } = useParams();

  useEffect(() => {
    dispatch(getIdDogs(id));
  }, [id]);

  function handleClick(){
    window.location = '/Home';
  }

  return (
    <div className={S.flexs}>
      <div className={S.navbar}>
      <button onClick={handleClick} className={S.button}>Home</button>
      </div>
      <div className={S.content}>
        <div>
          {detail.image ? (
            <img src={detail.image} className={S.img} />
          ) : (
            <img
              src="https://us.123rf.com/450wm/damedeeso/damedeeso1509/damedeeso150900033/44964439-trabajador-perro-manitas-con-el-casco-y-el-martillo-en-la-boca-listo-para-reparar-arreglar-todo-en-c.jpg?ver=6"
              className={S.img}
            />
          )}
          <h3 className={S.nam}>{detail.name}</h3>
        </div>
        <div className={S.bottom}>
          <div className={S.show}>
            <h5>Height: </h5>
            <h5 className={S.margin}> {" " + detail.height} CM</h5>
          </div>

          <div className={S.show}>
            <h5>Weight: </h5>
            <h5 className={S.margin}> {" " + detail.weight} Kg</h5>
          </div>

          <div className={S.show}>
            <h5>Life Span: </h5>
            <h5 className={S.margin}> {" " + detail.life_span} Years</h5>
          </div>

          <div className={S.show}>
            <h5>Temperament: </h5>
            <h5 className={S.margin}>
              {detail.temperaments
                ? typeof detail.temperaments === "object"
                  ? detail.temperaments.map((e) => {
                      if (e) {
                        return e + ", ";
                      }
                    })
                  : detail.temperaments.map((e) => {
                      if (e) {
                        return " " + e.name;
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
