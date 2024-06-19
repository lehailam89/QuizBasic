import React from 'react';
// import { Routes, Route } from "react-router-dom";
import PrivateRouter from "../components/PrivateRouter";
import LayoutDefault from '../LayoutDefault';
import Home from "../pages/Home";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Answers from '../pages/Answers';
import Quiz from '../pages/Quiz';
import Result from '../pages/Result';
import Topic from '../pages/Topic';
import Logout from '../pages/Logout';

export const routes = [
    {
        path:"/",
        element: <LayoutDefault />, 
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "register",
                element: <Register /> 
            },
            {
                path: "/",
                element: <PrivateRouter />,
                children: [
                    {
                        path: "answers",
                        element: <Answers />
                    },
                    {
                        path: "quiz/:id",
                        element: <Quiz />
                    },
                    {
                        path: "result/:id",
                        element: <Result />
                    },
                    {
                        path: "topics",
                        element: <Topic />
                    }
                ]
            }
        ]
    }
];