import React, { useEffect } from "react";
import List from "../shared/List";
import { useSelector } from "react-redux";
import SubscribeCard from "../shared/SubscribeCard";

const data = [
  {
    id: 1,
    plan: "Basic",
    price: 299,
    res: "720p - HD",
    quality: "Good",
  },
  {
    id: 2,
    plan: "Standard",
    price: 499,
    res: "1080p - Full HD",
    quality: "Better",
  },
  {
    id: 3,
    plan: "Premium",
    price: 799,
    res: "4K - Ultra HD",
    quality: "Best",
  },
];

const Profile = () => {
  const watchlist = useSelector((state) => state.user.user?.watchlist);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [watchlist]);

  return (
    <section className="profile">
      <List list={watchlist} head="Watchlist" fav={true}></List>
      <div className="subscribe">
        <h2 className="subscribe-heading">Subscribe Now</h2>
        <div className="card-container">
          {data.map((item) => (
            <SubscribeCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
