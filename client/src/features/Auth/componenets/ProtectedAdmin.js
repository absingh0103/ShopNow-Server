// To Protect Other Routes From If User Do not Exist Or Not Logged In
// or To prevent From accessing Cart page checkout page etc.


// For Admin USer 


import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectLoggedInUser } from "../AuthSlice";
import { selectCompleteUserInfo } from "../../User/userSlice";

const ProtectedAdmin = ({ children }) => {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectCompleteUserInfo);
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    if (userInfo && userInfo.role !== "admin" ) {
        return <Navigate to="/" replace={true}></Navigate>;
    }

    return children;
};

export default ProtectedAdmin;
