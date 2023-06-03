import React from "react";

export default function Select(props) {
  return (
    <div>
      {props?.title && (
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props?.title}
        </label>
      )}
      <select
        id="countries"
        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1.5 px-2.5"
      >
        <option selected disabled>
          {props?.label}
        </option>
        {props?.data.map((el) => {
          return <option value={el?.value}>{el?.label}</option>;
        })}
      </select>
    </div>
  );
}
