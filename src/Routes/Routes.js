import { createBrowserRouter } from "react-router-dom";
import Confirmation from "../components/Confirmation";
import EmployeeForm from "../components/EmployeeForm";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <EmployeeForm></EmployeeForm>,
    },
    {
        path: "/confirmation",
        element: <Confirmation></Confirmation>,
    },
])