import React, { useContext } from "react";
import { BsGoogle } from "react-icons/bs";
import { AuthContext } from "../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleAuth = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { signInWithGoogle } = useContext(AuthContext);
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        // swal("Loggedin Successfully");
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "user",
        };
        console.log(userData);
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              const notify = () => {
                toast("Loggedin Successfully");
              };
              notify();
            }
          });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        // swal(err.message);
        const notify = () => toast(err.message);
        notify();
      });
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-block mt-2 "
      >
        <BsGoogle />
        {text}
      </button>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
};

export default GoogleAuth;
