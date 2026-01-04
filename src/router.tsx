import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home} from "./Pages/Home";
import { MainLayout } from "./Layouts/MainLayout";
import { VerifyEmail } from "./Pages/VerifyEmail";
import {
  RecoverEmail,
} from "./Pages/RecoverEmail";
import {
  RecoverPassword,

} from "./Pages/RecoverPassword";
import { protectedMiddleware } from "./middleware/auth";
import { authLoader, homeLoader, verifyEmailLoader } from "./loaders/loaders";
import { LoadingSpinner } from "./Components/LoadingSpinner/LoadingSpinner";
import { HomeSkeleton } from "./Components/Skeleton/HomeSkeleton";
import { homeAction, loginAction, recoverEmailAction, recoverPasswordAction, registerAction } from "./actions/actions";

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
            action: recoverPasswordAction ,
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
