import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';

import UserRouter from "./urls/UserURL.js";
import BlogRouter from "./urls/BlogURL.js";



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

// Endpoints

app.use('/users', UserRouter);
app.use('/blogs', BlogRouter);

app.listen(port, () => {
    console.log(`Server running at ${process.env.BASE_URL}`);
});

export default app;