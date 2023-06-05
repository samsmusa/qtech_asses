import React from "react";
import Card from "../../../components/@common/Card";
import Select from "../../../components/@common/Select";

export default function ProductList({ data, loading }) {
  console.log("data", data);
  if (loading) {
    return "loading...";
  }
  return (
    <>
      <div className="bg-inherit flex justify-between items-center rounded-md py-2.5 px-4 mb-2">
        <p>EARPHONE HAS {data?.length} PRODUCTS</p>
        {/* <Select data={d1} label="sort by" /> */}
      </div>
      <div className="grid grid-cols-4 gap-x-2 gap-y-4">
        {data.map((el) => (
          <Card data={el} />
        ))}
      </div>
    </>
  );
}
