import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import "./styles/style.css";
import "./styles/custom.css";


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
import Favorites from "./pages/Favorites";
import UserEdit from "./pages/admin/UserEdit";
import AdminPostEdit from "./pages/admin/AdminPostEdit";
import ContactUs from "./pages/ContactUs";
import ResendEmailTokenPage from "./pages/ResendEmailTokenPage";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import AuthRequired from "./components/AuthRequired";

import { ROLES } from "./utils/roles";
import AuthCallback from "./pages/AuthCallback";
import { AuthVerify } from "./pages/AuthVerify";

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    index: true,
    path: "/",
    element: <Homepage />,
  }, {
    path: "/registration",
    element: <Registration />,
  }, {
    path: "/contact-us",
    element: <ContactUs />,
  }, {
    path: "/login",
    element: <Login />,
  }, {
    path: "/auth-callback",
    element: <AuthCallback />,
  },{
    path: "/news",
    element: <News />,
  }, {
    path: "/news/:id",
    element: <SinglePost />,
  }, {
    path: "/news/page/:pageNumber",
    element: <News />,
  }, {
    path: "/category/:id",
    element: <Category />,
  }, {
    path: "/tag/:id",
    element: <Tag />,
  },{
    path: "/auth/verify",
    element: <AuthVerify />,
  }, {
    path: "/reset_password_request",
    element: <PasswordResetRequestPage />,
  }, {
    path: "/auth/reset_password",
    element: <PasswordResetPage />,
  }, {
    path: "/resend",
    element: <ResendEmailTokenPage />,
  }, {
    element: <AuthRequired allowedRoles=
      {[ROLES.User]} />,
    children: [{
      path: "/profile",
      element: <Profile />,
    }, {
      path: "/profile/favorites",
      element: <Favorites />,
    },
    ]
  }, {
    element: <AuthRequired allowedRoles={[ROLES.Admin]} />,
    children: [
      {
      path: "/admin/users-list",
      element: <UsersList />,
    }, {
      path: "/admin/user/:id/edit",
      element: <UserEdit />,
    },
         {
        path: "/admin/posts-list",
        element: <AdminPostsList />,
      }, {
        path: "/admin/posts-list/:pageNumber",
        element: <AdminPostsList />,
      }, {
        path: "/admin/create-post",
        element: <CreatePost />,
      }, {
        path: "/admin/post/:id/edit",
        element: <AdminPostEdit />,
      },
  ],
  }, {
    element: <AuthRequired allowedRoles={[ROLES.Editor]} />,
    children: [
      {
        path: "/admin/posts-list",
        element: <AdminPostsList />,
      }, {
        path: "/admin/posts-list/:pageNumber",
        element: <AdminPostsList />,
      }, {
        path: "/admin/create-post",
        element: <CreatePost />,
      }, {
        path: "/admin/post/:id/edit",
        element: <AdminPostEdit />,
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
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
