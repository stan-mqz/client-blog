import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";
import { Home } from "./Pages/Home";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Login/>,
            action: loginAction
        },

        {
            path: '/register',
            element: <Register/>
        },

        {
            path: '/home',
            element: <Home/>
        }
    ]
)