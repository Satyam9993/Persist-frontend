import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Home';
import Signin from './Signin';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Edit from './Edit';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: ":userId/edit",
    element: <Edit />
  },
]);

const App = () => {
  const dispatch = useDispatch();
  // const {selectedLocation} = useSelector(state => state.user);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
