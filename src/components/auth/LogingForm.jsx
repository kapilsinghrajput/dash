"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function LogingForm() {
  const router = useRouter();
  const [isLoader, setIsLoader] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const response = await fetch("/api/SuperAdminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoader(false); // Ensures loader is hidden after process completion
    }
  };

  return (
    <div className="bg-slate-300 rounded-lg  ">
      <Toaster />
      {isLoader ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-3 text-black"
        >
          <input
            className="px-2 rounded-sm"
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) =>
              setFormdata({ ...formdata, [e.target.name]: e.target.value })
            }
          />
          <input
            className="px-2 rounded-sm"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setFormdata({ ...formdata, [e.target.name]: e.target.value })
            }
          />
          <button type="submit" className="bg-blue-500 text-white rounded-sm">
            Login
          </button>
        </form>
      )}
    </div>
  );
}
