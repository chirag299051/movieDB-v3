import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { genres } from "../shared/data";
import List from "../shared/List";

const KEY = "092e8cb2fdfe2fa5f210c9f2a932d024";
const MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&
    page=1&with_genres=`;

const TV_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&language=en-US&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_genres=`;

const Genres = () => {
  const [mData, setMData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    const fetchGenres = async () => {
      if (type === "movie") {
        const data = await Promise.all(
          genres.map(async (x) => {
            const res = await fetch(MOVIE_URL + x.id);
            const result = await res.json();
            console.log(result);
            return { results: result.results, genre: x.name };
          })
        );
        setMData(data);
      } else {
        const data = await Promise.all(
          genres.map(async (x) => {
            const res = await fetch(TV_URL + x.id);
            const result = await res.json();
            console.log(result);
            return { results: result.results, genre: x.name };
          })
        );
        setTvData(data);
      }
    };
    fetchGenres();
  }, [type]);

  useEffect(() => {
    console.log("Movie Data: ", mData);
    console.log("TV Data: ", tvData);
  });

  return (
    <section className="genres">
      {type === "movie"
        ? mData.map((x) => (
            <List key={x.id} list={x.results} head={x.genre} type={type} />
          ))
        : tvData
            .filter(
              (x) =>
                x.genre !== "Action" &&
                x.genre !== "Fantasy" &&
                x.genre !== "Horror" &&
                x.genre !== "Science Fiction" &&
                x.genre !== "war" &&
                x.genre !== "Thriller"
            )
            .map((x) => (
              <List key={x.id} list={x.results} head={x.genre} type={type} />
            ))}
    </section>
  );
};

export default Genres;
