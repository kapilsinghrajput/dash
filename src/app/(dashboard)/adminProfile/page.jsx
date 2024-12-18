"use client";

import React from "react";
import PasswordChange from "@/components/PasswordChange/PasswordChange";
import AddProfileImage from "@/components/AddProfileImage/AddProfileImage";
import { useUser } from "@/context/UserContext";



export default function Page() {

    const { userData } = useUser();
  

  return(
    <>
          <div className="flex justify-center mt-20">
        <h2 className="text-4xl font-bold">
          Welcome to{" "}
          <span className="text-blue-400">
            {`${userData.firstname} ${userData.lastname}`}
          </span>
        </h2>
      </div>
      
    <AddProfileImage/>
    <PasswordChange/>
    </>
  )
}
