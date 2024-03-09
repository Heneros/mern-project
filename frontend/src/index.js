import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { fab } from "@fortawesome/free-brands-svg-icons";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTopOnPageChange />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/page/:pageNumber",
        element: <Homepage />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "news/:id",
        element: <SinglePost />,
      },
      {
        path: "category/:id",
        element: <Category />,
      },
      {
        path: "tag/:id",
        element: <Tag />,
      },
      {
        path: "profile/favorites",
        element: <Favorites />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/admin/posts-list",
            element: <AdminPostsList />,
          },
          {
            path: "/admin/users-list",
            element: <UsersList />,
          },
          {
            path: "/admin/create-post",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
]);
library.add(fas, fab);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
