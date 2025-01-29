import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Page(){
    return(
        <div className="mt-24">
            <h1 className="font-bold text-3xl text-red-500 text-center ">LOGIN</h1>
            <LoginForm />
        </div>
    )
}