import Joi from "joi";
import jwt from "jsonwebtoken";
import { createBlogDB, createImageDB, deleteBlogDB, getAllBlogsDB, getBlogDB, getBlogImageDB, updateBlogDB } from "../utils/database.js";
import { getImageUrl, uploadImage } from "../utils/s3.js";

class BlogController {
    constructor(title, subtitle, body, created_at, image, price, author_id, token)
    {
        this.title = title;
        this.subtitle = subtitle;
        this.body = body;
        this.created_at = created_at;
        this.image = image;
        this.price = price;
        this.author_id = author_id;
        this.token = token;
    }

    AuthenticateCreatePost(body)
    {
        const schema = Joi.object({
            title: Joi.string().required(),
            subtitle: Joi.string(),
            body: Joi.string().required(),
            created_at: Joi.string().required(),
            image: Joi.any(),
            price: Joi.number().required(),
            author_id: Joi.number().required(),
        });
        return schema.validate(body);
    }

    // NEED TO WRITE AUTHENTICATEUPDATEPOST PROCEDURE
    AuthenticateUpdatePost(body)
    {
        return;
    }

    async createBlog(res, req)
    {   
        //current date
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed!
        const day = String(date.getDate()).padStart(2, '0');

        const formatted = `${year}-${month}-${day}`;
        this.created_at = formatted;

        // upload image to s3
        
        if (!this.image) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const imageKey = `blogs/${Date.now()}-${this.image.originalname}`;

        const uploadedImageKey = await uploadImage(
            this.image,
            imageKey,
        );

        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;
        const _image = await createImageDB(this.image.originalname, imageUrl);
        console.log(_image);
        
        // user id 

        this.author_id = jwt.verify(this.token, process.env.ADMIN_TOKEN)._id;

        // auhentication 
        const post = {
            title: this.title,
            subtitle: this.subtitle,
            body: this.body,
            created_at: this.created_at,
            image: _image.insertId,
            price: this.price,
            author_id: this.author_id
        }

        const { error } = this.AuthenticateCreatePost(post)
        if (error) return res.status(400).send({ type: "Error", message: error.details[0].message})

        // query to db - creating blog

        const blog = await createBlogDB(this.title, this.subtitle, this.body, this.created_at, post.image, this.price, this.author_id);
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

    async getBlogImage(res, image_id) {
        try {

            const data = await getBlogImageDB(image_id);

            console.log(data[0]);

            if (!data[0] || !data[0].url) {
                return res.status(404).json({
                    message: "Image not found"
                });
            }

            const imageKey = new URL(data[0].url).pathname.substring(1);

            console.log("S3 Key:", imageKey);

            const url = await getImageUrl(imageKey);

            return res.status(200).json({
                url: url
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Could not retrieve image"
            });

        }
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