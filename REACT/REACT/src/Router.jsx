import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./View/Dashboard";
import Survey from "./View/Survey";
import Login from "./View/Login";
import SignUp from "./View/SignUp";
import GuestLayout from "./Components/GuestLayout";
import DefaultLayout from "./Components/DefaultLayout";
import SurveyView from "./View/SurveyView";

const router = createBrowserRouter([

{
 path:'/',
 element: <DefaultLayout/>,
 children:[
    {
        path:'/dashboard',
        element: <Navigate to="/" />
    },
    {
        path:'/',
        element: <Dashboard />
    },
    {
        path:'/Survey',
        element: <Survey />
    },
    {
        path:'/Survey/create',
        element: <SurveyView />
    },
    {
        path:'/Survey/:id',
        element: <SurveyView />
    },
 ]
},
{
    path:'/',
    element:<GuestLayout/>,
    children:[
        {
            path:'/Login',
            element: <Login />
        },
        {
            path:'/SignUp',
            element: <SignUp />
        },
    ]
}
])

export default router;