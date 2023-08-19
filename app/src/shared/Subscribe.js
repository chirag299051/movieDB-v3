import React from "react";
import SubscribeCard from "./SubscribeCard";

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

const Subscribe = () => {
  return (
    <div className="subscribe">
      <h2 className="subscribe-heading">Subscribe Now</h2>
      <div className="card-container">
        {data.map((item) => (
          <SubscribeCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
