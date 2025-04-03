"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component) {
  return function IsAuth(props) {
    const auth = localStorage.getItem("shopa-token");


    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}