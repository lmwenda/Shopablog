import Joi from "joi";
import { createBlogDB, deleteBlogDB, getAllBlogsDB, getBlogDB, updateBlogDB } from "../utils/database.js";

class BlogController {
    constructor(title, subtitle, body, author_id)
    {
        this.title = title;
        this.subtitle = subtitle;
        this.body = body;
        this.author_id = author_id;
    }

    AuthenticateCreatePost(body)
    {
        const schema = Joi.object({
            title: Joi.string().required(),
            subtitle: Joi.string(),
            body: Joi.string().required(),
        });
        return schema.validate(body);
    }

    async createBlog(res)
    {   
        const post = {
            title: this.title,
            subtitle: this.subtitle,
            body: this.body,
            author_id: this.author_id
        }

        const { error } = this.AuthenticateCreatePost(post)
        if (error) return res.status(400).send({ type: "Error", message: error[0].details.message})

        const blog = await createBlogDB(this.title, this.subtitle, this.body, this.author_id);
        res.send(blog);
    }

    async getAllBlogs(res)
    {
        const data = await getAllBlogsDB();

        res.status(200).send({ type: "success", payload: data });
    }

    async getBlog(res, id)
    {
        const data = await getBlogDB(id);
        res.send(data);
    }

    async updateBlog(res, id)
    {
        const data = await updateBlogDB(id, this.title, this.subtitle, this.body)
        res.send(data);
    }

    async deleteBlog(res, id)
    {
        const data = await deleteBlogDB(id);
        res.send(data);
    }
}

export default BlogController;