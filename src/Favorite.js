import React, { useContext } from "react";
import { context } from "./context";
import List from "./List";

const Favorite = () => {
  const { favorites } = useContext(context);
  console.log(favorites);
  return (
    <section className="favorite">
      <List list={favorites} head="Favorites" fav={true}></List>
    </section>
  );
};

export default Favorite;
