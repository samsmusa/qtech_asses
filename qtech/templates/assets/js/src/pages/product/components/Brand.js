import React from "react";
import SidebarFilter from "../../../components/@common/SidebarFilter";
import useAxios from "../../../hooks/useAxios";
import { apis } from "../../../components/@common/api";

export default function Brand() {
  const { data, error, loading } = useAxios(apis.public.brands);
  const [brands, setBrands] = React.useState([]);
  React.useEffect(() => {
    if (data?.length > 0) {
      setBrands(
        data[0]?.variant?.map((val) => {
          return { value: val.id, label: val.title };
        })
      );
    }
  }, [data]);
  return (
    <div>
      <SidebarFilter label="BRAND" data={brands} loading={loading} />
    </div>
  );
}
