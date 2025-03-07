import { Router } from "express";
import BlogController from "../controllers/BlogController.js";
import { createBlogEndpoint, getAllBlogsEndpoint } from "../utils/endpoints.js";

const BlogRouter = Router();
const blog = new BlogController();

BlogRouter.post(createBlogEndpoint, async(req, res) => {
    blog.title = req.body.title;
    blog.subtitle = req.body.subtitle;
    blog.body = req.body.body;
    blog.author_id = req.body.author_id;

    blog.createBlog(res);
    
});

BlogRouter.get(getAllBlogsEndpoint, (req, res) => {
    blog.getAllBlogs(res);
});

export default BlogRouter;