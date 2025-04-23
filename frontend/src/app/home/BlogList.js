import { BASE_URL } from "@/app/exportedDefinitions";
import BlogCard from "./BlogCard";
import Link from "next/link";

export const GetBlogs = async() => {
    const response = await fetch(BASE_URL+ "/blogs/get/all");
    const data = await response.json();

    return data.payload;
}

export default async function BlogList () {
    const blogs = await GetBlogs();
    return(
        <div className="grid gap-8 md:grid-cols-2">
            {
                blogs.map((blog) => (
                    <Link href={`/blog/${blog.blog_id}`}>
                        <BlogCard
                        key={blog.blog_id}
                        date={blog.created_at}
                        title={blog.title}
                        subtitle={blog.subtitle}
                        image={blog.image}
                        />
                    </Link>
                ))
            }
        </div>
    );
}
