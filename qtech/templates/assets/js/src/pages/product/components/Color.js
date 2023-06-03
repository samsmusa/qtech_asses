import React from "react";
import SidebarFilter from "../../../components/@common/SidebarFilter";
import useAxios from "../../../hooks/useAxios";
import { apis } from "../../../components/@common/api";

export default function Color() {
  const { data, error, loading } = useAxios(apis.public.colors);
  const [color, setColors] = React.useState([]);
  React.useEffect(() => {
    if (data?.length > 0) {
      setColors(
        data[0]?.variant?.map((val) => {
          return { value: val.id, label: val.title };
        })
      );
    }
  }, [data]);
  return (
    <div>
      <SidebarFilter label="COLOR" data={color} loading={loading} />
    </div>
  );
}
