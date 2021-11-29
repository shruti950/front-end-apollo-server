import React from 'react';
import Select from "react-select/creatable";

export default function SelectComponent(props) {
  return (
    <>
    <Select isSearchable="true"
    options={props.options}
    onChange={props.onChange}
    className="basic-single"
    classNamePrefix="select"
    value={props.value}/>
    </>
  );
}
