import React, { useContext } from "react";
import Input from "../../../components/@common/Input";
import Button from "../../../components/@common/Button";
import { FilterContext } from "../../../context/FilterContext";
import debounce from "lodash.debounce";

export default function PriceFilter() {
  const { setFilterParams } = useContext(FilterContext);
  const [pricerange, setPriceRange] = React.useState({});
  const handleChange = (key) => (event) => {
    const value = parseFloat(event.target.value);
    setPriceRange((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleSubmit = () => {
    console.log("submit");
    setFilterParams((prev) => {
      return { ...prev, ...pricerange };
    });
  };
  const debouncedSubmit = React.useCallback(debounce(handleSubmit, 500));
  const style = {
    input:
      "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5",
    lable: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    button:
      "bg-red-700 text-white hover:bg-red-800 font-medium rounded-lg text-sm  py-2 w-full mx-2 col-span-2",
  };
  return (
    <div>
      <span className="text-left font-light mb-3">PRICE</span>
      <div className="grid grid-cols-12 align-middle items-center">
        <div className="flex col-span-10 justify-center items-center">
          <Input
            onChange={handleChange("PRICE_GT")}
            type="text"
            style={style}
          />
          <span className="mx-2">To</span>
          <Input
            onChange={handleChange("PRICE_LT")}
            type="text"
            style={style}
          />
        </div>
        <Button
          onClick={debouncedSubmit}
          type="button"
          text="GO"
          style={style.button}
        />
      </div>
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
