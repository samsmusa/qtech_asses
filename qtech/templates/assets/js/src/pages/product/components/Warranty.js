import React from "react";
import SidebarFilter from "../../../components/@common/SidebarFilter";
import useAxios from "../../../hooks/useAxios";
import { apis } from "../../../components/@common/api";

export default function Warrenty() {
  const { data, error, loading } = useAxios(apis.public.warranties);
  const [warranty, setWarranties] = React.useState([]);
  React.useEffect(() => {
    if (data?.length > 0) {
      setWarranties(
        data[0]?.variant?.map((val) => {
          return { value: val.id, label: val.title };
        })
      );
    }
  }, [data]);
  return (
    <div>
      <SidebarFilter label="WARRANTY" data={warranty} loading={loading} />
    </div>
  );
}
