import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import GoogleAuth from "../../components/GoogleAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        // swal("LogedIn Successfully");
        reset();
        const notify = () => toast("Loged in Successfully");
        notify();
        navigate(from, { replace: true });
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
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
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
                {errors.password && (
                  <span className="text-red-500">
                    Password must be between 6 to 20 charecters
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <label className="label">
                  <span>
                    Don't Have An Account?{" "}
                    <Link className="text-purple-500" to={"/signup"}>
                      Signup
                    </Link>
                  </span>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Login"}
                  className="btn btn-neutral"
                />
                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  theme="dark"
                />
              </div>
              <GoogleAuth text={"Login With Google"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
