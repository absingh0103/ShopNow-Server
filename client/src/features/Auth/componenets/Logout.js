import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutAsync } from "../AuthSlice";

import { checkUserAsync } from "../AuthSlice";
const Logout = () => {
  const dispatch = useDispatch();

  const user=useSelector(selectLoggedInUser)

  useEffect(() => {
    dispatch(signOutAsync())
    dispatch(checkUserAsync())
  });

  return (
    <div>
     {!user && <Navigate to="/login" replace={true}></Navigate>}
    </div>
  );
};

export default Logout;
