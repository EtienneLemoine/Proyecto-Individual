import React from "react";
import S from "./card.module.css";
export default function Paginate(props) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(props.dogis?.length / props.breads); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      {
        pageNumber?.length > 2 && 
          pageNumber?.map((e) =>{ 
            if(props.page === e){
             return (<button
              key= {e}
              onClick={() => {
                props.paginate(e)
              }}
              className={S.visited}>
              {e}
            </button>) 
            }
            return (<button
              key= {e}
              onClick={() => {
                props.paginate(e)
              }}
              className={S.paginate}>
              {e}
            </button>)
          })
        }
    </div>
  );
}
