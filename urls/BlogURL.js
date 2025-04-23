import { Router } from "express";
import BlogController from "../controllers/BlogController.js";
import { createBlogEndpoint, getAllBlogsEndpoint, getBlogEndpoint, updateBlogEndpoint, deleteBlogEndpoint } from "../utils/endpoints.js";

const BlogRouter = Router();
const blog = new BlogController();

BlogRouter.post(createBlogEndpoint, async(req, res) => {

    blog.title = req.body.title;
    blog.subtitle = req.body.subtitle;
    blog.body = req.body.body;
    blog.image = req.body.image;
    blog.price = req.body.price;
    blog.token = req.body.token;

    blog.createBlog(res);
    
});

BlogRouter.get(getAllBlogsEndpoint, (req, res) => {
    blog.getAllBlogs(res);
});

BlogRouter.get(getBlogEndpoint, async(req, res) => {
    blog.getBlog(res, req.body.id);
});

BlogRouter.put(updateBlogEndpoint, async(req, res) => {
    blog.title = req.body.title;
    blog.subtitle = req.body.subtitle;
    blog.body = req.body.body;

    blog.updateBlog(res, req.body.id);
})

BlogRouter.delete(deleteBlogEndpoint, async(req, res) => {
    blog.deleteBlog(res, req.body.id);
})

export default BlogRouter;