const initState = {
  searchResults: [],
  inTheatres: [],
  topRated: [],
  popular: [],
  selected: {},
  movies: [],
  tvShows: [],
};

const appReducer = (state = initState, action) => {
  if (action.type === "SEARCH") {
    return state;
  }
  if (action.type === "FETCH") {
    return { ...state, ...action.data };
  }
  if (action.type === "") {
    return state;
  }
  return state;
};

export default appReducer;
