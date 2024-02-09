import { createBrowserRouter, Outlet } from "react-router-dom";
import { Login } from "../pages/Authentication";
import { MainBill } from "../pages/MainBill";
import { ErrorNavigate } from "../pages/ErrorNavigate";
import { Layout } from "../pages/layout";

const HeaderLayout = () =>
{
    return <>
        <header>
            <Layout />
        </header>
        <Outlet />
    </>
}

export  const router =  createBrowserRouter([
    {
        element: <HeaderLayout />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/bill",
                element: <MainBill />
            },
            {
                path: "*",
                element: <ErrorNavigate />
            }
        ]
    }]);
