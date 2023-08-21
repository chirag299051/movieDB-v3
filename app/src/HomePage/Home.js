import React, { useEffect, useMemo } from "react";
import List from "../shared/List";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../shared/useFetch";
import { fetch } from "../store/actions/appActions";
import Signup from "../AuthPages/Signup";
import Login from "../AuthPages/Login";
import { setModal } from "../store/actions/userActions";

const KEY = "092e8cb2fdfe2fa5f210c9f2a932d024";
const inThURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=en-US&page=1`;
const topURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`;
const topURL2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=2`;
const popURL = `https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=en-US&page=1`;
const popURL2 = `https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=en-US&page=2`;

const Home = () => {
  const { data: inTheatres } = useFetch(inThURL);
  const { data: topRated1 } = useFetch(topURL);
  const { data: topRated2 } = useFetch(topURL2);
  const { data: popular1 } = useFetch(popURL);
  const { data: popular2 } = useFetch(popURL2);
  const topRated = useMemo(
    () => [...topRated1, ...topRated2],
    [topRated1, topRated2]
  );
  const popular = useMemo(
    () => [...popular1, ...popular2],
    [popular1, popular2]
  );

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetch(inTheatres, topRated, popular));
  }, [dispatch, inTheatres, topRated, popular]);

  return (
    <section className="home">
      <List list={inTheatres} head="In Theatres" type="movie" />
      <List list={topRated} head="Top Rated Movies" type="movie" />
      <List list={popular} head="Popular TV" type="tv" />
      {modal === "signup" ? (
        <Signup
          show={modal}
          onHide={() => dispatch(setModal(null))}
          login={() => dispatch(setModal("login"))}
        />
      ) : modal === "login" ? (
        <Login
          show={modal}
          onHide={() => dispatch(setModal(null))}
          signup={() => dispatch(setModal("signup"))}
        />
      ) : null}
    </section>
  );
};

export default Home;
