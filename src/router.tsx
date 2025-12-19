import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";
import { Home, loader as homeLoader } from "./Pages/Home";
import { MainLayout } from "./Layouts/MainLayout";
import {
  protectedAuthLoader,
  protectedLoader,
} from "./loaders/protectedLoaders";

import {
  action as registerAction
} from './Pages/Register';
import { VerifyEmail, loader as verifyEmailLoader } from "./Pages/VerifyEmail";
import { RecoverEmail, action as recoverEmailAction } from "./Pages/RecoverEmail";
import { RecoverPassword, action as recoverPasswordAction } from "./Pages/RecoverPassword";


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
        loader: verifyEmailLoader,
       
      },

      {
        path: 'recover-email',
        element: <RecoverEmail/>,
        action: recoverEmailAction
      },

      {
        path: 'recover-password',
        element: <RecoverPassword/>,
        action: recoverPasswordAction
        
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
        loader: homeLoader
      },
    ],
  },
]);
