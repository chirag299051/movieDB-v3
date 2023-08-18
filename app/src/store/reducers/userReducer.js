const initState = {
  user: {},
  modal: "login",
};

const userReducer = (state = initState, action) => {
  if (action.type === "ADD_TO_WATCHLIST") {
    console.log("ADD TO WATCHLIST", action);
    let newWatchlist = [];
    if (!state.user.watchlist?.some((x) => x.id == action.item.id))
      newWatchlist = [...state.user.watchlist, action.item];
    else newWatchlist = state.user.watchlist;
    return {
      ...state,
      user: { ...state.user, watchlist: newWatchlist },
    };
  }
  if (action.type === "DELETE") {
    const newWatchlist = state.user?.watchlist?.filter(
      (x) => x.id !== action.id
    );
    return {
      ...state,
      user: { ...state.user, watchlist: newWatchlist },
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.user,
    };
  }
  if (action.type === "SET_MODAL") {
    return {
      ...state,
      modal: action.modal,
    };
  }
  return state;
};

export default userReducer;
