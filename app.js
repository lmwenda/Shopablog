import express from "express";
import bodyParser from 'body-parser';

import UserRouter from "./urls/UserURL.js";

const port = 5000;
const app = express();

// Configure app to user bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello Ecommerce Blog");
});

// Endpoints

app.use('/users', UserRouter);
app.use('/blogs', )

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

export default app;