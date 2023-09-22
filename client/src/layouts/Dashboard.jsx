import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { LiaUserCogSolid } from "react-icons/lia";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {
  const dashboardItems = (
    <>
      <li>
        <Link to={"/"}>
          <FaHome />
          Home
        </Link>
      </li>
      <li>
        <Link to={"/dashboard"}>
          <BiSolidDashboard />
          Dashboard
        </Link>
      </li>
      <li>
        <Link to={"add-product"}>
          <MdPlaylistAdd className="text-2xl" />
          Add Product
        </Link>
      </li>
      <li>
        <Link to={"manage-products"}>
          <BsTools />
          Manage Products
        </Link>
      </li>
      <li>
        <Link to={"manage-users"}>
          <LiaUserCogSolid className="text-xl" />
          Manage Users
        </Link>
      </li>
      <li>
        <Link to={"add-upcoming-product"}>
          <MdPlaylistAdd className="text-2xl" />
          Add Upcoming Product
        </Link>
      </li>
      <li>
        <Link to={"manage-upcoming-products"}>
          <BsTools />
          Manage Upcoming Product
        </Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  relative items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-circle btn-ghost drawer-button lg:hidden absolute right-5 top-5"
          >
            <BiMenu className="text-3xl " />
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {dashboardItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
