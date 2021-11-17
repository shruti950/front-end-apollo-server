import React from 'react';
import { Button } from 'reactstrap';

export default function ButtonComponent(props) {
  console.log("🚀 ~ file: button.js ~ line 5 ~ ButtonComponent ~ props", props)
  return (
    <>
    <Button color="primary" type={props.type} onClick={props.onClick} outline>
      {props.value}
    </Button>
    </>
  );
}
