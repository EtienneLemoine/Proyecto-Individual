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

//   useEffect(() => {
//     dispatch(getDogs()); 
// }, [dispatch]);

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
// import React from "react";
// import Card from "./Card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDogs, getpage } from "../../Actions/index";
// import S from "./card.module.css";
// import Paginate from "./Paginate";

// export default function Cards() {
//   const dispatch = useDispatch();
//   const dogs = useSelector((state) => state.dogsLoaded);

//   const pages = useSelector((state) => state.page)
//   const breads = 9

//   useEffect(() => {
//       dispatch(getDogs()); 
//   }, [dispatch]);

//   let indexLast = pages * breads;
//   let firstIndex = indexLast - breads;
//   const currentBreads = dogs?.slice(firstIndex, indexLast);
  
  
//   function pagenate(pageNumber) {
//     dispatch(getpage(pageNumber));
//   }

//   return (
//     <div className={S.center}>
//       <div className={S.conten}>
//         {currentBreads &&
//         currentBreads.map((e) => {
//           return (
//             <Card
//               key={e.id}
//               name={e.name}
//               image={e.image}
//               temperament={e.temperaments}
//               id={e.id}
//             />
//           );
//         })}
//       </div>  
//       <div className ={S.pag}>
//         <Paginate page={pages} dogs={dogs} breads={breads} paginate={pagenate}/>
//       </div>
//     </div>
//   );
// }