import React from "react";
import useComingProducts from "../../../hooks/useComingProducts";
import Marquee from "react-fast-marquee";

const ComingProducts = () => {
  const [products] = useComingProducts();
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-4xl font-semibold text-center">Upcoming Products</h1>
      <Marquee>
        <div className="group  relative w-[20%] ">
          {products.map((product) => (
            <div className="border-x-2 border ">
              <img
                key={product._id}
                src={product.photo}
                class="group-hover:opacity-5 w-full"
              />
              <div class="text-center cursor-pointer border-none invisible group-hover:visible absolute top-[50%] left-[50%] text-2xl text-white -translate-x-1/2 -translate-y-1/2">
                <h1>{product.productName}</h1>
                <h1>
                  Releasing On:
                  {product.releaseDate}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ComingProducts;
