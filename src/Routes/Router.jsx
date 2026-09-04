import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/WithoutAuth/HomePage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/register";
import PrivateRoute from "../Provider/PrivateRoute";
import Home from "../Pages/AuthRequired/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import Workout from "../Pages/AuthRequired/Workout";
import Calisthenics from "../Pages/AuthRequired/Calisthenics";
import HomeWorkout from "../Pages/AuthRequired/HomeWorkout";
import WeightTraining from "../Pages/AuthRequired/WeightTraining";
import Analytics from "../Pages/AuthRequired/Analytics";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
       children: [
      {
        index: true, // Loads Home automatically on /dashboard
        element: <Home />
      },
      {
        path: "home", // Loads Home on /dashboard/home
        element: <Home />
      },
       {
        path:"workouts",
        children:[
            {
                index:true,
                element:<Workout/>
            },
            {
                path:"weight-training",
                element:<WeightTraining/>

            },
            {
                path:"calisthenics",
                element:<Calisthenics />
            },
            {
                path:"home-workout",
                element:<HomeWorkout />
            }

        ]
      },
       {
        path:"analytics",
        element:<Analytics />
      },
    ]

    }
])
