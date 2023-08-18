import React from "react";
import List from "../shared/List";
import { useSelector } from "react-redux";

const Profile = () => {
  const watchlist = useSelector((state) => state.user.user?.watchlist);
  console.log("watchlist :", watchlist);

  return (
    <section className="profile">
      <List list={watchlist} head="Watchlist" fav={true}></List>
    </section>
  );
};

export default Profile;
