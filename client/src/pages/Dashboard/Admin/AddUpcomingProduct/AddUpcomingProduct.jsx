import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
const img_hosting_token = import.meta.env.VITE_IMG_HOSTING_TOKEN;

const AddUpcomingProduct = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  console.log(img_hosting_url);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    let imgUrl;
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          imgUrl = imgRes.data.url;
          const productData = {
            productName: data.productName,
            photo: imgUrl,
            releaseDate: data.releaseDate,
          };

          fetch("http://localhost:5000/upcoming-product", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(productData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                const notify = () => {
                  toast("Product Added Successfully");
                };
                notify();
                reset();
              }
            });
        }
      })
      .catch((err) => {
        const notify = () => toast.error(err.message);
        notify();
      });
  };
  return (
    <>
      <div className="text-3xl text-center  mt-20">
        <span>Add Upcoming Product</span>
      </div>
      <div className="card-body w-[95%] lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("productName", { required: true })}
                type="text"
                name="productName"
                placeholder="Product Name"
                className="input input-bordered"
              />
              {errors.productName && (
                <span className="text-red-500">Product Name is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered"
              />
              {errors.image && (
                <span className="text-red-500">Picture is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Release Date</span>
              </label>
              <input
                {...register("releaseDate", { required: true })}
                type="text"
                className="input input-bordered"
              />
              {errors.releaseDate && (
                <span className="text-red-500">Release Date Is Required</span>
              )}
            </div>
          </div>

          <div className="form-control mt-10">
            <input
              className="btn btn-neutral"
              type="submit"
              value="Add product"
            />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              theme="dark"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUpcomingProduct;
