import React from "react";
import { useQuery } from "react-query";

const useProduct = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      return res.json();
    },
  });
  return [products];
};

export default useProduct;
