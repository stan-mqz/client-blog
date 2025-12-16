import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { MainLayout } from "./Layouts/MainLayout";
import { protectedLoader } from "./loaders/protectedLoader";


export const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login/>,
            action: loginAction
        },

        {
            path: '/register',
            element: <Register/>
        },

        {
            path: '/',
            element: <MainLayout/>,
            loader: protectedLoader,
            children: [
                {
                    index: true,
                    element: <Home/>
                }
            ]
        }
    ]
)