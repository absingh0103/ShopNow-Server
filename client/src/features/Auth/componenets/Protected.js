// To Protect Other Routes From If User Do not Exist Or Not Logged In
// or To prevent From accessing Cart page checkout page etc.
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectLoggedInUser, selectUserChecked } from "../AuthSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;
