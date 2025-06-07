"use client";

import { BASE_URL } from "../exportedDefinitions";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function BlogList () {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(BASE_URL+ "/blogs/get/all")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data.payload);
            });
    }, [setBlogs, blogs])

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
