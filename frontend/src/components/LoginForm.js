"use client";

import Link from "next/link";

export default function LoginForm() {
    const message = "";
    const emailHandler = () => {return true};
    const passwordHandler = () => {return true};

    const  loginUser = () => {
        return true;
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