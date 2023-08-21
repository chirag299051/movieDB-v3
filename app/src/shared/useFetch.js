import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      const resp = await fetch(url);
      const result = await resp.json();
      const _data = result.results
        ? result.results.filter(
            (x) => x.original_language === "en" && !x.title?.includes("Gabriel")
          )
        : result;

      setData(_data);
    };
    fetchData(url);
  }, [url]);
  return { data };
};
