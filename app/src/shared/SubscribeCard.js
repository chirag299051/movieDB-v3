import React from "react";
import { Button } from "react-bootstrap";

const SubscribeCard = ({ plan, price, res, quality }) => {
  return (
    <div className="subscribe-card">
      <div className="plan">{plan.toUpperCase()}</div>
      <div className="details">
        <span>&#8377;{price} / month</span>
        <span>Resolution: {res}</span>
        <span>Video quality: {quality}</span>
      </div>
      <Button className="pay-btn">Pay now</Button>
    </div>
  );
};

export default SubscribeCard;
