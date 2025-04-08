import { redirect } from "next/navigation";
import isAuth from "../isAuthenticated";
import BlogList from "./BlogList";

function Page(){
    const auth = isAuth;

    if(!auth)
    {
        redirect("/");
    }

    return(
        <>
            <BlogList />
        </>
    );
}

export default Page;