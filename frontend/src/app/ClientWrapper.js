"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./exportedDefinitions";

export default function ClientWrapper({ children })
{
    let auth = isAuthenticated;
    const [isLoggedin, setIsLoggedIn ] = useState(false);
    const [token, setToken ] = useState('');
    
    useEffect(() => {
        setToken(localStorage.getItem("shopa-token"));
        console.log(token);

        if (token) {
            auth = true;
            return setIsLoggedIn(true);
        }

        auth = false;
        return setIsLoggedIn(false);
    });

    return(
        <>
            <Header isLoggedIn={isLoggedin} token={token} />
            {children}
        </>
    )
}