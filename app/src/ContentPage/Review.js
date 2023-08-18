import React from "react";
import { BsStarFill } from "react-icons/bs";

const Review = ({ data }) => {
  const {
    author,
    content,
    author_details: { rating, avatar_path },
  } = data;

  return (
    avatar_path && (
      <article className="review">
        <img
          src={
            avatar_path.substr(1) ||
            `https://secure.gravatar.com/avatar/${avatar_path}?s=50`
          }
          alt="-_-"
        />
        <h6>
          <span>
            {author} - {rating}&nbsp;
            <BsStarFill color="goldenrod" size="15" />
          </span>
        </h6>
        <p>{content}</p>
      </article>
    )
  );
};

export default Review;
