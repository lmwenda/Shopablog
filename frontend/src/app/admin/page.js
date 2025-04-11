"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import CreateBlog from "./CreateBlog";

function Page()
{
    useEffect(() => {
        const token = localStorage.getItem("admin-token");
        if(!token){
            redirect("/admin/login");
        }
    })
    return(
        <div>
            <h1>Admin Page</h1>
            <CreateBlog />
        </div>
    );
}

export default Page;