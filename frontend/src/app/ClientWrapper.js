"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientWrapper({ children })
{
    const router = useRouter();
    const [isLoggedin, setIsLoggedIn ] = useState(false);
    const [token, setToken ] = useState('');
    
    useEffect(() => {
        setToken(localStorage.getItem("shopa-token"));
        console.log(token);

        if (token) {
            router.push(`/home/${token}`) 
            return setIsLoggedIn(true);
        }

        return setIsLoggedIn(false);
    });

    return(
        <>
            <Header isLoggedIn={isLoggedin} token={token} />
            {children}
        </>
    )
}