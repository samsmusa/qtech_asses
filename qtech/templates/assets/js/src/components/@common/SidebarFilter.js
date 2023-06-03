import React, { useContext, useState } from "react";
import Checkbox from "./Checkbox";
import Spinner from "./Spinner";
import { FilterContext } from "../../context/FilterContext";
import debounce from "lodash.debounce";

export default function SidebarFilter(props) {
  const { setFilterParams } = useContext(FilterContext);
  const [showAll, setShowAll] = useState(false);
  const style = {
    input:
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    label: "ml-3 text-sm font-light text-gray-900 dark:text-gray-300",
    button:
      "bg-red-700 text-white hover:bg-red-800 font-medium rounded-lg text-sm py-2 w-full mx-2 col-span-2",
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setFilterParams((prev) => {
      const existingValues = prev[props.label] || [];
      const updatedValues = event.target.checked
        ? [...existingValues, value]
        : existingValues.filter((el) => el !== value);
      return { ...prev, [props.label]: updatedValues };
    });
  };

  const debouncedSubmit = React.useCallback(debounce(handleChange, 500));

  if (props?.loading) {
    return <Spinner />;
  }

  const renderCheckboxes = (data, start, end) =>
    data
      .slice(start, end)
      .map((el) => (
        <Checkbox
          key={el?.value + el?.label}
          id={el?.value + el?.label}
          value={el?.value}
          label={el?.label}
          style={style}
          onChange={debouncedSubmit}
        />
      ));

  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <div>
      <span className="text-left font-light mb-3">{props.label}</span>
      {renderCheckboxes(props?.data, 0, 3)}
      {showAll && renderCheckboxes(props?.data, 3, props?.data.length)}
      <span
        onClick={toggleShowAll}
        className="text-left text-xs cursor-pointer text-blue-600 underline font-light mb-3"
      >
        {showAll ? "show less" : "show all"}
      </span>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
