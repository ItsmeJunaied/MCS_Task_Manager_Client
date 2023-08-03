import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layouts/Main';
import Home from './pages/Home/Home/Home';
import AddTask from './pages/AddTask/AddTask';
import ViewTask from './pages/ViewTask/ViewTask';
import LogIN from './pages/LogIN/LogIN';
import SignUp from './pages/SignUp/SignUp';
import Authprovider from './Authprovider/Authprovider';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/addTask',
        element: <AddTask></AddTask>
      },
      {
        path: '/viewTask',
        element: <ViewTask></ViewTask>
      },
      {
        path: '/login',
        element: <LogIN></LogIN>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </React.StrictMode>,
)
