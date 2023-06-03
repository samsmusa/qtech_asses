import React from "react";

export default function Button(props) {
  return (
    <button type="button" class={props.style} onClick={props?.onClick}>
      {props.text}
    </button>
  );
}
