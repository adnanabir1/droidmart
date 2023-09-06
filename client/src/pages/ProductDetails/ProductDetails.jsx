import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/product-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductDetails(data);
      });
  }, []);
  return (
    <div className=" min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-52 lg:flex-row mx-auto">
        <img
          src={productDetails?.pictureUrl}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{productDetails?.productName}</h1>
          <p className="py-6">{productDetails?.additionalInfo}</p>
          {/* <p className="py-6">{productDetails?.additionalInfo}</p> */}

          <button className="btn btn-neutral">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
