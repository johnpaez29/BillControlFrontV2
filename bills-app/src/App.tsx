import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/routes";
import 'bootstrap/dist/css/bootstrap.min.css';
 
export function App () {
    return (
    <RouterProvider router={router}/>
    )
}