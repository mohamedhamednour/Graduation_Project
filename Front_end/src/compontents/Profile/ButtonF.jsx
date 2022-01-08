import React from "react";

const ButtonF = (props) => {
  return (
    <button id="btn1" className="btn btn-primary" onClick={props.onClick}>
      {props.btnText}
    </button>
  );
};

export default ButtonF;
