import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Category from "../../layout/Pages/Category/Category/Category";
import Home from "../../layout/Pages/Home/Home";
import Login from "../../layout/Pages/Login/Login/Login";
import Register from "../../layout/Pages/Login/Register/Register";
import News from "../../layout/Pages/News/News/News";
import Profile from "../../layout/Pages/Others/Profile/Profile";
import TermsAndConditions from "../../layout/Pages/Others/TermsAndConditions/TermsAndConditions";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([

    {
    path: "/",
    element: <Main></Main>,
    children: [
        {
        path: "/",
        element: <Home></Home>,
        loader: ()=> fetch('http://localhost:5000/news')
        },
        {
            path: "/category/:id",
            element: <Category></Category>,
            loader: ({params})=> fetch(`http://localhost:5000/category/${params.id}`)
        },
        {
            path: "/news/:id",
            element: <PrivateRoute><News></News></PrivateRoute>, //! private page
            loader: ({params}) => fetch(`http://localhost:5000/news/${params.id}`)
        },
        {
            path: '/login',
            element: <Login></Login>,
        },
        {
            path: '/register',
            element: <Register></Register> ,
        },
        {
            path: '/terms',
            element: <TermsAndConditions></TermsAndConditions>
        },
        {
            path:'/profile',
            element: <PrivateRoute><Profile></Profile></PrivateRoute>

        }

             ],
    }

]);