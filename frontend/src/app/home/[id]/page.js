import { BASE_URL } from "@/app/exportedDefinitions";
import BlogCard from "../../../components/BlogCard";

export default async function Page(){
    const response = await fetch(BASE_URL + "/blogs/get/all")
    const blogs = await response.json();

    // DEBUGGING
    // console.log(blogs);
    return(
        <>
            <section className="bg-white pb-10 pt-4 dark:bg-dark lg:pb-20 lg:pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                            <h2 className="mb-4 text-3xl p-3 font-bold text-blue-800 sm:text-4xl md:text-[40px]">
                            Read new Blogs
                            </h2>
                            <p className="text-base text-body-color dark:text-dark-6">
                            There are many different blogs available that you can read.
                            It's good to spend time to develop yourself and learn.
                            </p>
                        </div>
                        </div>
                    </div>
        
                    <div className="-mx-4 flex flex-wrap ">
                        {
                            blogs.payload.map((blog) => (
                                <BlogCard
                                key={blog.blog_id}
                                date="Dec 22, 2023"
                                CardTitle={blog.title}
                                CardDescription={blog.body}
                                image={blog.image}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}