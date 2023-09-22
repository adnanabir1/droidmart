import React from "react";
import Banner from "./components/Banner/Banner";
import ComingProducts from "./components/ComingProducts";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner />
      <ComingProducts />
    </div>
  );
};

export default Home;
