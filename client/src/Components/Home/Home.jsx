import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Nav from "../NavBar/Nav";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { getDogs } from "../../Actions";

export default function Home() {
  const dispatch = useDispatch();
  const  [loading, setLoading]  = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  

  
  useEffect(() => {
    dispatch(getDogs()); 
    setCurrentPage(1)
}, [dispatch]);

  return (
    <div>
      {loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
        <div>
          <Nav setCurrentPage={setCurrentPage} currentPage={currentPage}/>
          <div>
            <Cards setCurrentPage={setCurrentPage} currentPage={currentPage}/>
          </div>
        </div>
      )}
    </div>
  );
}
