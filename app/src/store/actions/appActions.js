export const fetch = (inTheatres, topRated, popular) => (dispatch) => {
  dispatch({
    type: "FETCH",
    data: {
      inTheatres,
      topRated,
      popular,
    },
  });
};

export const setTheme = (theme) => (dispatch) => {
  console.log("theme ", theme);
  dispatch({ type: "SET_THEME", theme });
};

export const setPage = (page) => (dispatch) => {
  dispatch({ type: "SET_PAGE", page });
};
