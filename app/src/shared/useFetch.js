import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      const resp = await fetch(url);
      const result = await resp.json();
      // const _data = (result.results || result);
      const _data = result.results
        ? result.results.filter(
            (x) => x.original_language === "en" && !x.title?.includes("Gabriel")
          )
        : result;
      console.log("result", result);

      setData(_data);
      setLoading(false);
    };
    fetchData(url);
  }, [url]);
  return { data };
};
