import React from "react";

export default function Checkbox(props) {
  return (
    <div class="flex items-center my-2">
      <input
        id={props?.id}
        type="checkbox"
        value={props?.value}
        class={props?.style?.input}
        onChange={props?.onChange}
      />
      {props?.label && (
        <label for={props?.id} class={props?.style?.lable}>
          {props?.label}
        </label>
      )}
    </div>
  );
}
