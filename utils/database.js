import mysql2 from "mysql2";

// Need to convert to environment variables
const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Bandobaby123',
    database: 'shopablog'
}).promise();

// const [ data ] = await pool.query("SELECT Blog.author_id, User.user_id, User.email, User.username, Blog.title FROM Blog INNER JOIN User ON Blog.author_id = User.user_id;");
// console.log(data)

// USER

const createUserDB = async (email, username, password) => {
    // console.log("Creating User")
    const [ data ] = await pool.query(`INSERT INTO User(email, username, password, isEmailVerified)
    Values ("${email}", "${username}", "${password}", False);`)

    console.log("Processing User's Credentials... \n")

    // console.log(data);

    return data;

}

const getAllUsersDB = async() => {
    // console.log("Getting Users..")

    const [ data ] = await pool.query(`SELECT * FROM User;`);

    // console.log(data);

    return data;
}

const getUserDB = async(id) => {
    // console.log("Retrieving Single User...");

    const [ data ] = await pool.query(`SELECT * FROM User WHERE user_id=${id};`)
    // console.log(typeof id, id);
    
    return data;
}

// BLOG

const createBlog = async (email, username, password) => {
    console.log("Initiating new Blog")
    const [ data ] = await pool.query(`INSERT INTO Blog(email, username, password, isEmailVerified)
    Values ("${email}", "${username}", "${password}", False);`)

    console.log("Processing Data... \n")

    console.log(data);

}

const getAllBlogs = async() => {
    console.log("Getting Blogs...");

    const [ data ] = await pool.query("SELECT * FROM Blog;");

    console.log(data)
}

export { createBlog, createUserDB, getUserDB, getAllUsersDB, getAllBlogs };
