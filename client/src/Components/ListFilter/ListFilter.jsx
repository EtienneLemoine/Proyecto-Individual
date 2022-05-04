import React, { useEffect } from "react";
import Card from "../Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Nav from "../NavBar/Nav";


export default function ListFilter() {
  const dispatch = useDispatch();
  const aut = useSelector((state) => state.dogsLoaded);

  const pages = useSelector((state) => state.page)
  const [breads] = useState(9);

  let indexLast = pages * breads;
  let firstIndex = indexLast - breads;
  const currentBreads = aut?.slice(firstIndex, indexLast);

  return (
    <div>
      <Nav />
      <div >
        <div >
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
