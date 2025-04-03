import { BASE_URL } from "@/app/exportedDefinitions";
import BlogCard from "../../components/BlogCard";
import Link from "next/link";

const BlogList = async () => {
    const response = await fetch(BASE_URL + "/blogs/get/all")
    const blogs = await response.json();

    return(
        <>
            {
                blogs.payload.map((blog) => (
                    <Link href={`/blog/${blog.blog_id}`}>
                        <BlogCard
                        key={blog.blog_id}
                        date={blog.created_at}
                        CardTitle={blog.title}
                        CardSubTitle={blog.subtitle}
                        image={blog.image}
                        />
                    </Link>
                ))
            }
        </>
    );
}

export default BlogList;