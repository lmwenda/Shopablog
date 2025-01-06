import { Router } from "express";

const BlogRouter = Router();

BlogRouter.get("/get/all", (req, res) => {
    res.send("blogs....")
})

export default BlogRouter;