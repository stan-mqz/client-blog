import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";
import { Home, loader as homeLoader, action as homeAction } from "./Pages/Home";
import { MainLayout } from "./Layouts/MainLayout";

import { action as registerAction } from "./Pages/Register";
import { VerifyEmail, loader as verifyEmailLoader } from "./Pages/VerifyEmail";
import {
  RecoverEmail,
  action as recoverEmailAction,
} from "./Pages/RecoverEmail";
import {
  RecoverPassword,
  action as recoverPasswordAction,
} from "./Pages/RecoverPassword";
import { protectedMiddleware } from "./middleware/auth";
import { authLoader } from "./loaders/loaders";
import { LoadingSpinner } from "./Components/LoadingSpinner/LoadingSpinner";
import { HomeSkeleton } from "./Components/Skeleton/HomeSkeleton";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "auth",
        loader: authLoader,
        HydrateFallback: LoadingSpinner,
        children: [
          {
            path: "login",
            element: <Login />,
            action: loginAction,
          },

          {
            path: "register",
            element: <Register />,
            action: registerAction,
          },

          {
            path: "verify-email",
            element: <VerifyEmail />,
            loader: verifyEmailLoader,
          },

          {
            path: "recover-email",
            element: <RecoverEmail />,
            action: recoverEmailAction,
          },

          {
            path: "recover-password",
            element: <RecoverPassword />,
            action: recoverPasswordAction,
          },
        ],
      },

      {
        path: "/home",
        element: <MainLayout />,
        middleware: [protectedMiddleware],
        HydrateFallback: HomeSkeleton,
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader,
            action: homeAction,
          },

          {
            path: "create-post",
          },
        ],
      },
    ],
  },
]);
