import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdDogs } from "../../Actions/index";
import { useParams } from "react-router";
import S from "./detail.module.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";


export default function Details() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.dogDetails);
  const  [loading, setLoading]  = useState(true);
  console.log(detail)
  let { id } = useParams();

  useEffect(() => {
    dispatch(getIdDogs(id));
  }, [id]);

  return (
    <div>
      {loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
    <div className={S.flexs}>
      <div className={S.navbar}>
      <Link to='/Home'>
      <button  className={S.button}>Home</button>
      </Link>
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
                    ? detail.temperaments.map((e) => {
                        return e + ", ";
                      })
                    : "Not found"}
                </h5>
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
  );
}
