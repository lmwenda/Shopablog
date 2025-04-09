import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';

import UserRouter from "./urls/UserURL.js";
import BlogRouter from "./urls/BlogURL.js";
import { pool, verifyUserDB } from "./utils/database.js";



const port = process.env.PORT; 
const app = express();

dotenv.config();
// Configure app to user bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// more middleware
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello Ecommerce Blog");
});

// Verify Email 
app.get("/verify/:id", async(req, res) => {
        const token = req.params.id;
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    
        const user = await pool.query(`SELECT * FROM User WHERE email="${decoded.email}";`)
        const email = user[0][0].email;

       if(decoded.email == email)
        {
            verifyUserDB(decoded.email);
            res.redirect(process.env.FRONTEND_URL+"home")
        } 
});

// Endpoints

app.use('/users', UserRouter);
app.use('/blogs', BlogRouter);

app.listen(port, () => {
    console.log(`Server running at ${process.env.BASE_URL}`);
});

export default app;