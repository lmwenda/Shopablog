"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

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

        </div>
    );
}

export default Page;