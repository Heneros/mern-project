import React from "react";
import { Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./styles/style.css";
import "./styles/custom.css";

import PrivateRoute from "./components/PrivateRoute";

import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";

import store from "./redux/store";
import Login from "./pages/Login";
import News from "./pages/News";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Tag from "./pages/Tag";
import AdminPostsList from "./pages/admin/AdminPostsList";
import UsersList from "./pages/admin/UsersList";
import CreatePost from "./pages/admin/CreatePost";

import ScrollToTopOnPageChange from "./components/ScrollToTopOnPageChange";
import Favorites from "./pages/Favorites";
import UserEdit from "./pages/admin/UserEdit";
import AdminPostEdit from "./pages/admin/AdminPostEdit";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<SinglePost />} />
        <Route path="/news/page/:pageNumber" element={<SinglePost />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/tag/:id" element={<Tag />} />
        <Route path="profile/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
};

export default App;
