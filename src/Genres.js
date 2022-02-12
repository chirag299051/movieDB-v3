import React from "react";

const GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=092e8cb2fdfe2fa5f210c9f2a932d024&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&
    page=1&with_genres={id}`;

const Genres = () => {
  return <section className="genres">Genres Working</section>;
};

export default Genres;
