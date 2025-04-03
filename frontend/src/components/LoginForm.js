"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { BASE_URL } from "@/app/exportedDefinitions";

export default function LoginForm() {

    const router = useRouter();

    const [ message, setMessage ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const emailHandler = (e) => setEmail(e.target.value);
    const passwordHandler = (e) => setPassword(e.target.value);

    const  loginUser = async(e) => {
        e.preventDefault();
        const body = {
            email,
            password
        }

        const response = await fetch(BASE_URL + "users/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        setMessage(data.message)
        console.log(data);

        if(data.token)
        {
            localStorage.setItem("shopa-token", data.token);
            console.log(data.token);
            return router.push(`/home`)
        }
    }
    return(
        <form className="flex flex-col space-y-5 mt-10 items-center">
        
            <label className="text-center justify-center text-red">{message}</label>
            
            <label className="w-[80vw] text-left md:w-[50vw]">Email</label>
            <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={emailHandler} type="email" />

            <label className="w-[80vw] text-left md:w-[50vw]">Password</label>
            <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" type="password" onChange={passwordHandler} />
        
            <button onClick={loginUser} className="p-2 bg-red-500 font-bold text-white rounded w-[90vw] sm:w-[50vw]">
                Login
            </button>
            <Link className="text-blue-500 underline" href="/register">Don't have an account? Create one now!</Link>
        </form>
    );
}