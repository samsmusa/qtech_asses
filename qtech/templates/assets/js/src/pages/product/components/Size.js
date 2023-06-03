import React from "react";
import SidebarFilter from "../../../components/@common/SidebarFilter";
import useAxios from "../../../hooks/useAxios";
import { apis } from "../../../components/@common/api";

export default function Size() {
  const { data, error, loading } = useAxios(apis.public.sizes);
  const [size, setSizes] = React.useState([]);
  React.useEffect(() => {
    if (data?.length > 0) {
      setSizes(
        data[0]?.variant?.map((val) => {
          return { value: val.id, label: val.title };
        })
      );
    }
  }, [data]);
  return (
    <div>
      <SidebarFilter label="SIZE" data={size} loading={loading} />
    </div>
  );
}
