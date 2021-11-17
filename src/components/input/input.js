import React from 'react';
import {Input} from 'reactstrap'
export default function InputComponent(props) {
  return (
    <>
    <Input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}/>
    </>
  );
}
