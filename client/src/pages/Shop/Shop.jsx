import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products] = useProduct();
  const [noOfElements, setNoOfElements] = useState(12);
  const loadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };
  const slice = products.slice(0, noOfElements);
  return (
    <>
      <div className="flex flex-wrap w-2/3 mx-auto gap-16 my-5">
        {slice.map((product) => (
          <div className="card w-96 bg-base-100 shadow-xl relative">
            <AiOutlineHeart className="absolute top-0 right-1 text-2xl" />
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
                  className="btn btn-neutral"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={loadMore} className="btn btn-neutral w-32 mx-auto">
        <MdOutlineExpandMore className="text-3xl" />
      </button>
    </>
  );
};

export default Shop;
