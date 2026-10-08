import { Router } from "express";
import BlogController from "../controllers/BlogController.js";
import { createBlogEndpoint, getAllBlogsEndpoint, getBlogEndpoint, updateBlogEndpoint, deleteBlogEndpoint, getBlogImageEndpoint } from "../utils/endpoints.js";
import multer from "multer";

const BlogRouter = Router();
const blog = new BlogController();

const upload = multer({
    storage: multer.memoryStorage()
});

BlogRouter.post(createBlogEndpoint, upload.single("image"), async(req, res) => {

    blog.title = req.body.title;
    blog.subtitle = req.body.subtitle;
    blog.body = req.body.body;
    blog.image = req.file;
    blog.price = req.body.price;
    blog.token = req.body.token;

    blog.createBlog(res, req);
    
});

BlogRouter.post(getBlogImageEndpoint, async(req, res) => {
    const imageID = req.body.image_id;
    console.log("Got Image ID:" + imageID);
    blog.getBlogImage(res, imageID);
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