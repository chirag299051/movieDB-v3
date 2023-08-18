import React, { useState, useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../store/actions/userActions";

const ListItem = ({ item, fav, del }) => {
  const [favorite, setFavorite] = useState();
  const [typ, setTyp] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) =>
    state.user.user ? state.user.user._id : null
  );

  const {
    id,
    title,
    release_date,
    poster_path,
    vote_average,
    name,
    first_air_date,
    type,
  } = item;

  const addToList = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToWatchlist(userId, item));
  };

  const onDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    del(id, userId, title || name);
    console.log(userId);
  };

  useEffect(() => {
    setTyp(title ? "movie" : "tv");
  }, []);

  // useEffect(() => {
  //   setFavorite(favorites.some((x) => x.id === id));
  // }, []);

  return (
    poster_path && (
      <Link to={`/${typ}/${id}`} className="list-item">
        <img
          src={"https://image.tmdb.org/t/p/w200" + poster_path}
          alt="No Image"
        />
        <div className="item-detail">
          {fav && (
            <div className="delete-wrapper">
              <MdDelete
                className="delete"
                onClick={(e) => onDelete(e)}
                size="20"
                color="deepskyblue"
                style={{
                  position: "relative",
                  top: "12%",
                  left: "22%",
                }}
              />
            </div>
          )}
          <FaHeart
            className={favorite ? "heart fav" : "heart"}
            onClick={(e) => addToList(e, item)}
            color="red"
            size="20"
            style={{
              position: "absolute",
              marginTop: "-40px",
              marginLeft: "105px",
              color: favorite ? "red" : "grey",
            }}
          />
          <h6>
            {title && title.length > 15 ? title.substr(0, 15) + "..." : title}
          </h6>
          <h6>
            {name && name.length > 15 ? name.substr(0, 15) + "..." : name}
          </h6>
          <div className="details">
            <BsFillStarFill
              color="gold"
              fontSize=".8rem"
              style={{
                position: "relative",
                marginTop: "-5px",
              }}
            />
            <span style={{ marginLeft: "5px" }}>{vote_average.toFixed(1)}</span>
            &emsp;&emsp;
            <span>{release_date && release_date.substr(0, 4)}</span>
            <span>{first_air_date && first_air_date.substr(0, 4)}</span>
          </div>
        </div>
      </Link>
    )
  );
};

export default ListItem;
