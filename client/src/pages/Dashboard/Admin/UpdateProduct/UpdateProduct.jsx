import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const updateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    const productData = {
      productName: data.productName,
      price: data.price,
      pictureUrl: data.pictureUrl,
      ram: data.ram,
      rom: data.rom,
      battery: data.battery,
      additionalInfo: data.additionalInfo,
    };
  };
  return (
    <>
      <div className="text-3xl text-center  mt-20">
        <span>Update Product</span>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture URL</span>
              </label>
              <input
                {...register("pictureUrl", { required: true })}
                type="text"
                name="pictureUrl"
                placeholder="Picture URL"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Any Additional Info?</span>
            </label>
            <textarea
              {...register("additionalInfo")}
              type="text"
              name="additionalInfo"
              placeholder="If Needed"
              className="input input-bordered pt-3"
            />
          </div>
          <div className="form-control mt-10">
            <input
              className="btn btn-neutral"
              type="submit"
              value="Add product"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default updateProduct;
