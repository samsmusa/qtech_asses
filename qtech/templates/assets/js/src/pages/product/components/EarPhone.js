import React from "react";
import SidebarFilter from "../../../components/@common/SidebarFilter";

export default function EarPhone() {
  const data = Array(6)
    .fill(1)
    .map((el, index) => {
      return { value: index, label: index };
    });
  return (
    <div>
      <SidebarFilter label="EARPHONE" data={data} />
    </div>
  );
}
