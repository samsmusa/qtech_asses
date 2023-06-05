import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/@common/Sidebar";
import ProductList from "./components/ProductList";
import useAxios from "../../hooks/useAxios";
import { apis } from "../../components/@common/api";
import { FilterContext } from "../../context/FilterContext";
import { getFilterProduct } from "../services/ProductServices";

export default function Product() {
  const [filterParams, setFilterParams] = useState({});
  const [products, setProducts] = useState([]);
  const { data, error, loading } = useAxios(apis.public.product);
  const filterEnum = {
    brand: "BRAND",
    size: "SIZE",
    color: "COLOR",
    warranty: "WARRANTY",
    price_lt: "PRICE_LT",
    price_gt: "PRICE_GT",
  };

  const handleFilterChange = useCallback(async (newFilterParams) => {
    const filterMappings = {
      [filterEnum.brand]: "product_variant_price__product_variant_brand_id__in",
      [filterEnum.size]: "product_variant_price__product_variant_size_id__in",
      [filterEnum.color]: "product_variant_price__product_variant_color_id__in",
      [filterEnum.warranty]:
        "product_variant_price__product_variant_warranty_id__in",
      [filterEnum.price_lt]: "product_variant_price__price__lt",
      [filterEnum.price_gt]: "product_variant_price__price__gt",
    };

    const params = new URLSearchParams();
    Object.entries(newFilterParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const paramKey = filterMappings[key];
        if (paramKey) {
          if (Array.isArray(value)) {
            params.append(paramKey, value.join(","));
          } else {
            params.append(paramKey, value.toString());
          }
        }
      }
    });

    const paramString = "?" + params.toString();
    const filteredProducts = await getFilterProduct(paramString);
    console.log(
      "filteredProducts kkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      filteredProducts
    );
    setProducts(filteredProducts?.data);
  }, []);

  useEffect(() => {
    if (Object.keys(filterParams).length > 0) {
      handleFilterChange(filterParams);
    }
  }, [filterParams]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <FilterContext.Provider value={{ filterParams, setFilterParams }}>
      <div className="container mx-auto flex">
        <div className="w-72 relative">
          <Sidebar />
        </div>

        <div className="px-4 w-full">
          <ProductList data={products} loading={loading} />
        </div>
      </div>
    </FilterContext.Provider>
  );
}
