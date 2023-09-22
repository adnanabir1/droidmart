import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { MdOutlineExpandMore } from "react-icons/md";

import { Link } from "react-router-dom";

const Shop = () => {
  const [products] = useProduct();
  const [noOfElements, setNoOfElements] = useState(12);
  const loadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };
  const renderedProducts = products.slice(0, noOfElements);
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  gap-5 my-5">
        {renderedProducts.map((product) => (
          <div
            key={product._id}
            className="card w-11/12 mx-auto bg-base-100 shadow-xl relative"
          >
            <BsFillHeartFill className="absolute top-0 right-1 text-2xl text-yellow-500" />
            <figure>
              <img className="max-h-72 p-2" src={product.pictureUrl} />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>

              <p>
                Price: <span>{product.price}</span>
              </p>
              <p>
                Available Quantity: <span>{product.quantity}</span>
              </p>

              <div className="card-actions justify-end">
                <Link
                  to={`/product-details/${product._id}`}
                  className="btn btn-neutral "
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="  flex justify-center my-12">
        <button onClick={loadMore} className="btn btn-neutral text-center w-40">
          <MdOutlineExpandMore className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Shop;
