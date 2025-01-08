import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

import UserRouter from "./urls/UserURL.js";
import BlogRouter from "./urls/BlogURL.js";


dotenv.config();

const port = 5000;
const app = express();

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
    console.log(`Server running at http://localhost:${port}/`);
});

export default app;