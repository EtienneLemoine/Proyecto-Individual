import React, { useState } from "react";
import Cards from "../Cards/Cards";
import Nav from "../NavBar/Nav";
import Loading from "../Loading/Loading";

export default function Home() {
  const  [loading, setLoading]  = useState(true);

  return (
    <div>
      {loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
        <div>
          <Nav />
          <div>
            <Cards />
          </div>
        </div>
      )}
    </div>
  );
}
