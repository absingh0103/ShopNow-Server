import React from "react";
import UserProfile from "../features/User/components/UserProfile";
import {
  FaceSmileIcon
} from "@heroicons/react/24/outline";
const UserProfilePage = () => {

  return (
    <div>
      <div>
        <header className="bg-gradient-to-r from-rose-200 to-teal-200 shadow -mt-12 ">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold font-serif tracking-tight text-rose-500">
              My <span className="text-rose-600" >Pr<FaceSmileIcon className="h-10 w-10 mb-1 text-rose-600 inline animate-bounce"/>file</span> 
            </h1>
              
          </div>
        </header>
      </div>
    
      <UserProfile></UserProfile>
    </div>
  );
};

export default UserProfilePage;
