import React from "react"; import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
