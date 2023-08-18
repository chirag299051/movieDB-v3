import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { useHistory, withRouter } from "react-router-dom";

const KEY = "092e8cb2fdfe2fa5f210c9f2a932d024";
const searchURL = `https://api.themoviedb.org/3/search/multi?api_key=${KEY}&language=en-US&query=`;

const Search = () => {
  const history = useHistory();
  const [value, setValue] = useState("peaky blinders");

  const search = async (val) => {
    const resp = await fetch(searchURL + val);
    const result = await resp.json();
    console.log(result);

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

  const formatOptionLabel = ({ title, year }) => (
    <div>
      <div className="option" style={{}}>
        {title}
      </div>
      <div style={{ float: "right", color: "#ccc" }}>
        {year && year.substr(0, 4)}
      </div>
    </div>
  );

  const handleSelect = ({ title, id, type }) => {
    setValue(title);
    history.push(`/${type}/${id}`);
    console.log(title, id, type);
  };
  return (
    <AsyncSelect
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="Search..."
      value={value}
      cacheOptions
      loadOptions={() => search(value)}
      onInputChange={(val) => setValue(val)}
      formatOptionLabel={formatOptionLabel}
      defaultOptions
      options={[
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ]}
      onChange={handleSelect}
    />
  );
};

export default withRouter(Search);
