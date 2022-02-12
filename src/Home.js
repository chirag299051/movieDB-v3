import React, { useContext, useState, useEffect } from "react";
import List from "./List";
import { context } from "./context";

const Home = () => {
  const { inTheatres, topRated, topRated2, popularTv } = useContext(context);
  const [tRated, setTrated] = useState([]);
  
    useEffect(() => {
      setTrated([...topRated, ...topRated2]);
    },[topRated, topRated2])

  return (
    <section className="home">
      <List list={inTheatres} head="In Theatres" type="movie" />
      <List list={tRated} head="Top Rated Movies" type="movie" />
      <List list={popularTv} head="Popular TV" type="tv" />
    </section>
  );
};

export default Home;
