import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

const PrivateLayout = () => {
  const token = localStorage.getItem("role");

  return token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateLayout;
