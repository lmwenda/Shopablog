"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "./exportedDefinitions";

export default function ClientWrapper({ children })
{
    const router = useRouter();
    let auth = isAuthenticated;
    const [isLoggedin, setIsLoggedIn ] = useState(false);
    const [token, setToken ] = useState('');
    
    useEffect(() => {
        setToken(localStorage.getItem("shopa-token"));
        console.log(token);

        if (token) {
            router.push(`/home`) 
            auth = true;
            return setIsLoggedIn(true);
        }

        auth = false;
        router.push("/");
        return setIsLoggedIn(false);
    });

    return(
        <>
            <Header isLoggedIn={isLoggedin} token={token} />
            {children}
        </>
    )
}