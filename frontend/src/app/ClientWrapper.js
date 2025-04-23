"use client";

import { redirect, usePathname } from 'next/navigation';
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function ClientWrapper({ children })
{
    const { login, user } = useUser();
    const [isLoggedin, setIsLoggedIn ] = useState(false);
    const [token, setToken ] = useState('');
    const path = usePathname();
    
    useEffect(() => {
        setToken(localStorage.getItem("shopa-token"));
        console.log(token);
        
        if (token) {
            login(token);
            return setIsLoggedIn(true);
        }
        console.log("user", user);

        switch (path){
            case "/home":
                if (!user) redirect("/");
                break;
            case "/library":
                if(!user) redirect("/");
            case "/profile":
                if(!user) redirect("/");
            default:
                console.log(user);
                
        }

        return setIsLoggedIn(false);
    });

    return(
        <>
            <Header isLoggedIn={isLoggedin} />
            {children}
        </>
    )
}