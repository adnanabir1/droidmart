import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import GoogleAuth from "../../components/GoogleAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const img_hosting_token = import.meta.env.VITE_IMG_HOSTING_TOKEN;

const Signup = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    let imgURL;

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          imgURL = imgRes.data.url;
          createUser(data.email, data.password).then((result) => {
            updateUserProfile(data.name, imgURL).then(() => {
              // Sending data to DB
              const userData = {
                name: data.name,
                email: data.email,
                image: imgURL,
                role: "user",
              };
              fetch("http://localhost:5000/user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userData),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    const notify = () => toast("Account Created Successfully");
                    notify();
                    reset();
                    logOut();
                    navigate("/login");
                  }
                });
            });
          });
        }
      })
      .catch((err) => {
        // swal(err.message);
        const notify = () => toast.error(err.message);
        notify();
      });
  };
  return (
    <div>
      <div className="hero mt-20 ">
        <div className="hero-content w-1/2 flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <h1 className="text-3xl text-center font-bold">Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              {errors.password && (
                <span className="text-red-500">
                  Password must be between 6 to 20 charecters
                </span>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="confirm password"
                  className="input input-bordered"
                />
                {confirmPasswordError && (
                  <span className="text-red-500">Password didn't match</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: true,
                  })}
                  className="file-input file-input-bordered"
                />
              </div>
              {errors.photo && (
                <span className="text-red-500">Photo is Required</span>
              )}

              <label className="label">
                <span>
                  Have An Account?{" "}
                  <Link className="text-purple-500" to={"/login"}>
                    Login
                  </Link>
                </span>
              </label>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Signup"}
                  className="btn btn-neutral"
                />
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  theme="dark"
                />
              </div>
              <GoogleAuth text={"Signup With Google"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
