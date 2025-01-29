import RegisterForm from "@/components/RegisterForm";

export default function Page(){
    return(
        <div className="md:mt-24">
            <h1 className="font-bold text-3xl  text-red-500 text-center ">CREATE YOUR ACCOUNT</h1>
            <RegisterForm />
        </div>
    )
}