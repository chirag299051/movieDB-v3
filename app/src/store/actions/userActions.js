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
  dispatch({ type: "SET_USER", user });
};

export const setModal = (modal) => (dispatch) => {
  dispatch({ type: "SET_MODAL", modal });
};
