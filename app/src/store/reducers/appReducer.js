const initState = {
  searchResults: [],
  inTheatres: [],
  topRated: [],
  popular: [],
  selected: {},
  movies: [],
  tvShows: [],
  theme: "dark",
  page: "home",
};

const appReducer = (state = initState, action) => {
  if (action.type === "FETCH") {
    return { ...state, ...action.data };
  }
  if (action.type === "SET_THEME") {
    return { ...state, theme: action.theme };
  }
  if (action.type === "SET_PAGE") {
    // console.log("page : ", action.page);
    return { ...state, page: action.page };
  }
  return state;
};

export default appReducer;
