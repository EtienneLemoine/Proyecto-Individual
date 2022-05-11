import React from "react";
import Card from "./Card";
import S from "./card.module.css";
import Pagination from "../paginacion/Pagination"
import { useSelector } from "react-redux";


export default function Cards({setCurrentPage, currentPage}) {
  // const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogsLoaded);
  const breads = 8

  

  let indexLast = currentPage * breads;
  let firstIndex = indexLast - breads;
  const currentBreads = dogs?.slice(firstIndex, indexLast);
  
  const pag = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className={S.center}>
      <Pagination
        currentPage={currentPage}
        totalCount={dogs.length}
        pageSize={breads}
        onPageChange={pag}
      />
      <div className={S.conten}>
        {
        currentBreads?.map((e) => {
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
      <div>
      <Pagination
        currentPage={currentPage}
        totalCount={dogs.length}
        pageSize={breads}
        onPageChange={pag}
      />
      </div>
    </div>
  );
}
