import axios from "axios";
import { apis } from "../../components/@common/api";

export const getFilterProduct = async (filter_params) => {
  console.log(
    "apis.public.product + filter_params",
    apis.public.product + filter_params
  );
  try {
    return await axios.get(apis.public.product + filter_params);
  } catch (error) {
    console.log(error);
  }
};
