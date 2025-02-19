"use client";

import { BASE_URL } from "@/app/exportedDefinitions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterForm() {

    const router = useRouter();
    const [message, setMessage ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const emailHandler = (e) => setEmail(e.target.value);
    const usernameHandler = (e) => setUsername(e.target.value);
    const passwordHandler = (e) => setPassword(e.target.value);

    const registerUser = async (e) => {
        e.preventDefault();

        const body = {
            email,
            username,
            password
        }
        const response  = await fetch(BASE_URL + "users/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        setMessage(data.message)

        console.log(response);
        console.log(data)

        if (response.status == 200) return router.push("/login");
 

    }
    return(
        <form className="flex flex-col space-y-5 mt-10 items-center ">
        
            <label className="text-center justify-center text-red">{message}</label>
            
            <label className="w-[80vw] text-left md:w-[50vw]">Email</label>
            <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={emailHandler} type="email" />

            <label className="w-[80vw] text-left md:w-[50vw]">Username</label>
            <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={usernameHandler} type="text" />

            <label className="w-[80vw] text-left md:w-[50vw]">Password</label>
            <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" type="password" onChange={passwordHandler} />
        
            <button onClick={registerUser} className="p-2 bg-red-500 text-red-500 rounded w-[90vw] sm:w-[50vw]">
                <h1 className="font-bold text-white">Register</h1>
            </button>
            <Link className="text-blue-500 underline" href="/login">Already have an account? Login</Link>
        </form>
    );
}