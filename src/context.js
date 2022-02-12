import React, { useState, useEffect } from "react";

const KEY = "092e8cb2fdfe2fa5f210c9f2a932d024";
const searchURL = `https://api.themoviedb.org/3/search/multi?api_key=${KEY}&language=en-US&query=`;
const inThURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=en-US&page=1`;
const topURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`;
const topURL2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=2`;
const popURL = `https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=en-US&page=1`;
export const context = React.createContext();

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const resp = await fetch(url);
    const result = await resp.json();
    // const _data = (result.results || result);
    const _data = (result.results ? result.results.filter(x => (x.original_language === 'en' || x.original_language === 'hi' || x.original_language === 'ko') && (!x.title?.includes('Gabriel'))) : result);
    console.log('result', result)
    // setData(_data.filter(x => (x.original_language === 'en' || x.original_language === 'hi' || x.original_language === 'ko') && (!x.title?.includes('Gabriel'))));
    setData(_data)
    setLoading(false);
  }, [url]);
  return { data };
};

const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { data: inTheatres } = useFetch(inThURL);
  const { data: topRated } = useFetch(topURL);
  const { data: topRated2 } = useFetch(topURL2);
  const { data: popularTv } = useFetch(popURL);

  useEffect(() => {
    // console.log('TH: ', inTheatres);
    // console.log('TR: ', topRated);
    // console.log('TV: ', popularTv);
    
  }, [inTheatres, topRated, popularTv]);

  const search = async (val) => {
    const resp = await fetch(searchURL + val);
    const result = await resp.json();
    console.log(result);
    // setOptions(result.results);
    return result.results
      .map((x) => {
        const obj = {
          title: x.name || x.title,
          year: x.release_date || x.first_air_date,
          type: x.media_type,
          id: x.id,
        };
        return obj;
      })
      .sort((a, b) => a.vote_average - b.vote_average);
  };

  const addToList = (e, id, item) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((favorites) => {
      if (!favorites.some((x) => x.id === id)) {
        return [...favorites, item];
      }
      return favorites;
    });
    console.log(item);
  };

  const deleteItem = (id) => {
    setFavorites((favorites) => favorites.filter((x) => x.id !== id));
    console.log("deleted");
  };

  return (
    <context.Provider
      value={{
        search,
        inTheatres,
        topRated,
        topRated2,
        popularTv,
        useFetch,
        favorites,
        addToList,
        deleteItem,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AppProvider;
