import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const addToWatchlist = (userId, item) => (dispatch) => {
  axios.put(`${serverUrl}/add/` + userId, item);
  dispatch({ type: "ADD_TO_WATCHLIST", item });
};

export const deleteFromWatchlist = (id, userId) => (dispatch) => {
  axios.delete(`${serverUrl}/delete/${id}/${userId}`);
  dispatch({ type: "DELETE", id, userId });
};

export const setUser = (user) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({ type: "SET_USER", user });
};

export const setModal = (modal) => (dispatch) => {
  dispatch({ type: "SET_MODAL", modal });
};

export const getFromLocalStorage = () => (dispatch) => {
  const user =
    localStorage.getItem("user") != "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  if (user === "undefined") dispatch({ type: "SET_MODAL", modal: "login" });
  else dispatch({ type: "SET_USER", user });
};
