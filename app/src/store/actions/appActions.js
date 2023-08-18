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
