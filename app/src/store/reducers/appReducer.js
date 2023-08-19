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
  return state;
};

export default appReducer;
