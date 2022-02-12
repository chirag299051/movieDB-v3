import React, { useEffect, useState, useContext } from "react";
import { AutoComplete } from "@react-md/autocomplete";
import { context } from "./context";
import AsyncSelect from "react-select/async";
import { useHistory, withRouter } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  const [value, setValue] = useState("peaky blinders");
  const { search } = useContext(context);

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
      // styles={customStyles}
      // inputValue={value}
      value={value}
      cacheOptions
      loadOptions={() => search(value)}
      onInputChange={(val) => setValue(val)}
      // getOptionValue={(option) => option.title}
      // getOptionLabel={(option) => option.title || option.name}
      formatOptionLabel={formatOptionLabel}
      // menuIsOpen
      defaultOptions
      options={[{ value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }]}
      onChange={handleSelect}
    />
  );
};

export default withRouter(Search);
