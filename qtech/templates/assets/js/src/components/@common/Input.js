import React from "react";

export default function Input(props) {
  return (
    <div>
      {props?.label && (
        <label for={props?.id} class={props?.style?.label}>
          {props?.label}
        </label>
      )}
      <input
        onChange={props?.onChange}
        type={props?.type}
        id={props?.id}
        class={props?.style?.input}
        placeholder={props?.placeholder}
        pattern={props?.pattern}
      />
    </div>
  );
}
