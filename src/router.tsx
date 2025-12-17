import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { MainLayout } from "./Layouts/MainLayout";
import {
  protectedAuthLoader,
  protectedLoader,
} from "./loaders/protectedLoaders";

import {
    action as registerAction
} from './Pages/Register'
import { VerifyEmail, loader as verifyEmailLoader} from "./Pages/VerifyEmail";


export const router = createBrowserRouter([
  {
    path: "/auth",
    loader: protectedAuthLoader,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },

      {
        path: "register",
        element: <Register />,
        action: registerAction
      },

      {
        path: 'verify-email',
        element: <VerifyEmail/>,
        loader: verifyEmailLoader
      }
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    loader: protectedLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
