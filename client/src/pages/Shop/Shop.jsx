import React from "react";
import useProduct from "../../hooks/useProduct";

const Shop = () => {
  const [products] = useProduct();
  return (
    <div className="flex flex-wrap w-2/3 mx-auto gap-16 my-5">
      {products.map((product) => (
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img className="max-h-72" src={product.pictureUrl} />
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
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
