import React from "react";
import ListItem from "./ListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { deleteFromWatchlist } from "../store/actions/userActions";

const List = ({ list, head, fav }) => {
  const dispatch = useDispatch();

  const del = (id, userId, title) => {
    toast.info(
      (title.length > 25 ? title.substr(0, 25) + "..." : title) +
        " removed from Favorites!",
      {
        icon: "✘",
        theme: "dark",
        closeButton: false,
      }
    );
    dispatch(deleteFromWatchlist(id, userId));
  };

  return (
    <section>
      <h3 className="head">{head}</h3>
      <article className="list">
        {Array.isArray(list) &&
          list.map((x, index) => (
            <ListItem key={index} item={x} fav={fav} del={del} />
          ))}
      </article>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default List;
