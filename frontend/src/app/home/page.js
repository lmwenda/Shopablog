"use server";
import BlogList from "./BlogList";

function Page(){
    return(
        <main className="max-w-5xl mx-auto px-4 py-10">
            <BlogList />
        </main>
    );
}

export default Page;