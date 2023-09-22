import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ManageUpcomingProducts = () => {
  // const [products] = useProduct();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/upcoming-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/upcoming-products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.deleteCount > 0) {
          const restProducts = products.filter(
            (product) => product._id !== product.id
          );
          setProducts(restProducts);
          const notify = () => {
            toast("Product Deleted Successfully");
          };
          notify();
        }
      });
  };

  return (
    <div className="flex flex-wrap gap-10 lg:p-40 mx-auto">
      {products.map((product) => (
        <div
          key={product._id}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img className="max-h-72" src={product.photo} />
          </figure>
          <div key={product._id} className="card-body">
            <h2 className="card-title">{product.productName}</h2>
            <p className="text-xl">
              <span className="font-semibold">ReleaseDate: </span>
              {product.releaseDate}
            </p>

            <div className="card-actions justify-end">
              <Link
                className="btn btn-neutral text-xl"
                to={`update/product/${product._id}`}
              >
                <FaEdit />
              </Link>
              <Link
                onClick={() => handleDelete(`${product._id}`)}
                className="btn btn-neutral text-xl"
              >
                <FaTrash />
              </Link>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="dark"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUpcomingProducts;
