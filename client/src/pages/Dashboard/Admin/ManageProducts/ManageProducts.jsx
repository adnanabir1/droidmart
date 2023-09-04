import React from "react";
import useProduct from "../../../../hooks/useProduct";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products] = useProduct();
  return (
    <div className="flex gap-6">
      {products.map((product) => (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={product.pictureUrl} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.productName}</h2>
            <p className="text-xl">
              <span className="font-semibold">Price: </span>
              {product.price}
            </p>
            <p className="text-xl">
              <span className="font-semibold">RAM: </span>
              {product.ram}
            </p>
            <p className="text-xl">
              <span className="font-semibold">ROM: </span>
              {product.rom}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Processor: </span>
              {product.processor}
            </p>

            <div className="card-actions justify-end">
              <Link
                className="btn btn-neutral text-xl"
                to={`update/product/${product._id}`}
              >
                <FaEdit />
              </Link>
              <Link className="btn btn-neutral text-xl">
                <FaTrash />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
