import React from "react";
import Card from "../Cards/Card";
import { useSelector } from "react-redux";
import { useState } from "react";
import Nav from "../NavBar/Nav";
import S from "./ListFilter.module.css"

export default function ListFilter() {
  const aut = useSelector((state) => state.dogsLoaded);

  const pages = useSelector((state) => state.page)
  const [breads] = useState(9);

  let indexLast = pages * breads;
  let firstIndex = indexLast - breads;
  const currentBreads = aut?.slice(firstIndex, indexLast);

  return (
    <div>
      <Nav />
      <div className={S.center}>
        <div className={S.conten}>
          {currentBreads &&
            currentBreads.map((e) => {
              return (
                <Card
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  temperament={e.temperaments}
                  id={e.id}
                />
              );
            })}
        </div>
      
      </div>
    </div>
  );
}
