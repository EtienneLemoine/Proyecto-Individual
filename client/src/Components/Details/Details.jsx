import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdDogs } from "../../Actions/index";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import S from "./detail.module.css";

export default function Details() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.dogDetails);

  let { id } = useParams();

  useEffect(() => {
    dispatch(getIdDogs(id));
  }, [id]);

  return (
    <div className={S.flexs}>
      
      <Link to="/Home">
        <button>HOME</button>
      </Link>

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
            <h5>Altura: </h5>
            <h5 className={S.margin}> {" " + detail.height} CM</h5>
          </div>

          <div className={S.show}>
            <h5>Peso: </h5>
            <h5 className={S.margin}> {" " + detail.weight} M</h5>
          </div>

          <div className={S.show}>
            <h5>Esperanza de vida: </h5>
            <h5 className={S.margin}> {" " + detail.life_span} Years</h5>
          </div>

          <div className={S.show}>
            <h5>Temperamento: </h5>
            <h5 className={S.margin}>
              {detail.temperaments
                ? typeof detail.temperaments === "object"
                  ? detail.temperaments.map((e) => {
                      if (e) {
                        return "  " + e;
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
