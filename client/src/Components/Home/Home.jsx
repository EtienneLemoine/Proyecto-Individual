import React, { useState } from "react";
import Cards from "../Cards/Cards";
import Nav from "../NavBar/Nav";
import Loading from "../Loading/Loading";

export default function Home() {
  const  [loading, setLoading]  = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
