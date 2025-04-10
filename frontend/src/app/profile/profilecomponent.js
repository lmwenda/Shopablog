"use client";

import VerifyAlert from "@/components/VerifyAlert";
import Image from "next/image";
import img from "../image.jpg"
import { useEffect, useState } from "react";
import { BASE_URL } from "../exportedDefinitions";

function ProfileComponent()
{
  const [ username, setUsername ] = useState("");
  const [ email, setEmail] = useState("");
  const [ isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const UserData = async() => {
      const token = localStorage.getItem("shopa-token");
      
      const response = await fetch(BASE_URL+`/users/${token}`);
      const payload = await response.json();
      
      console.log(payload);
      
      setUsername(payload[0].username);
      setEmail(payload[0].email);
      
      if(payload[0].isEmailVerified == 1){
        setIsEmailVerified(true);
      }else{
        setIsEmailVerified(false);
      }
    }
    
    let ignore = false;
    UserData();
    return () => {
      ignore = true;
    };
  }, [isEmailVerified]);
    return(
        <div className="min-h-screen bg-gray-100 py-10">
        {isEmailVerified ? null : <VerifyAlert />}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Image
                src={img} // Make sure to place a profile picture in the 'public' directory or use a URL.
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full border-4 border-blue-500"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">{email}</h1>
              <p className="text-lg text-gray-600">{username}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="mt-8 space-y-6">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Username:</span>
              <span className="text-gray-600">{username}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email Verified:</span>
              <span className="text-gray-600">{isEmailVerified ? "True" : "False"}</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Bio</h2>
            <p className="mt-4 text-gray-600">
              I'm a passionate web developer with experience in building dynamic
              web applications using JavaScript, React, and Next.js. I love creating
              beautiful and functional user interfaces and solving complex problems.
            </p>
          </div>
        </div>
      </div>
    );
}

export default ProfileComponent;