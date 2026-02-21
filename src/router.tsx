import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { MainLayout } from "./Layouts/MainLayout";
import { VerifyEmail } from "./Pages/VerifyEmail";
import { RecoverEmail } from "./Pages/RecoverEmail";
import { RecoverPassword } from "./Pages/RecoverPassword";
import { protectedMiddleware } from "./middleware/auth";
import { authLoader, getSinglePostLoader, homeLoader, profileLoader, verifyEmailLoader } from "./loaders/loaders";
import { LoadingSpinner } from "./Components/LoadingSpinner/LoadingSpinner";
import { HomeSkeleton } from "./Components/Skeleton/HomeSkeleton";
import {
  createPostAction,
  editPostAction,
  homeAction,
  loginAction,
  recoverEmailAction,
  recoverPasswordAction,
  registerAction,
  settingsAction,
} from "./actions/actions";
import { VerificationMessage } from "./Components/UI/VerificationMessage";
import { CreatePostModal } from "./Components/UI/CreatePostModal";
import { EditPostModal } from "./Components/UI/EditPostModal";
import { ProfilePage } from "./Pages/ProfilePage";
import { PostDetails } from "./Components/UI/PostDetails";
import { Settings } from "./Pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [

      {
        index: true,
        element: <Navigate to="/home" replace />
      },
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
            path: "success",
            element: <VerificationMessage />,
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
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader,
            HydrateFallback: HomeSkeleton,
          },

          {
            path: "create-post",
            element: <CreatePostModal />,
            action: createPostAction
          },

          {
            path: 'display-post/:id',
            element: <PostDetails />,
            loader: getSinglePostLoader,
            action: homeAction
          },

          {
            path: "edit-post/:id",
            element: <EditPostModal />,
            action: editPostAction,
            loader: getSinglePostLoader
          },

          {
            path: 'profile/:id',
            element: <ProfilePage />,
            loader: profileLoader,
            action: homeAction
          },

          {
            path: 'settings',
            action: settingsAction,
            element: <Settings />
          }

        ],
      },
    ],
  },
]);
