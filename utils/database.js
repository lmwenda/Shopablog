import mysql2 from "mysql2";

console.log(process.env.host)

// Need to convert to environment variables
export const pool = mysql2.createPool({
    host: process.env.host,
    user: process.env.user, 
    password: process.env.password, // just change password when git pull to your local db password
    database: process.env.database
}).promise();

// const [ data ] = await pool.query("SELECT Blog.author_id, User.user_id, User.email, User.username, Blog.title FROM Blog INNER JOIN User ON Blog.author_id = User.user_id;");
// console.log(data)

// USER

const createUserDB = async (email, username, password, res) => {
    // console.log("Creating User")

    // checking if user exists

    const [ user ]= await pool.query(`SELECT * FROM User WHERE email='${email}';`)
    console.log(user[0])
    if (typeof user[0] !== "undefined") 
    {   
        console.log("user already exists");
        return "User Already Exists..."
    }

    // creating user

    const [ data ] = await pool.query(`INSERT INTO User(email, username, password, isEmailVerified)
    Values ("${email}", "${username}", "${password}", False);`)

    console.log("Processing User's Credentials... \n")

    console.log(data);

   return data;

}

// update email verified

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

const deleteUserDB = async(id) => {
    const [ data ] = await pool.query(`DELETE FROM User WHERE user_id=${id};`);
    return data;
}

const updateUserDB = async(id, username) => {
    const [ data ] = await pool.query(`UPDATE User SET username=${username} WHERE user_id=${id};`);
    return data;
}

const verifyUserDB = async (email) => {
    const [ data ] = await pool.query(`UPDATE User SET isEmailVerified=1 WHERE email='${email}';`);

    console.log(`Email Verified: ${email}`);
    return data;
}

// BLOG

const createBlogDB = async (title, subtitle, body, created_at, image, price, author_id) => {
    console.log("Initiating new Blog")

    const [ data ] = await pool.query(`INSERT INTO Blog(title, subtitle, body, created_at, image, price, author_id)
    Values ("${title}", "${subtitle}", "${body}", "${created_at}", "${image}",  "${price}","${author_id}");`);

    console.log("Processing Data... \n")

    console.log(data);

    return data;

}

const getAllBlogsDB = async() => {
    console.log("Getting Blogs...");

    const [ data ] = await pool.query("SELECT * FROM Blog;");

    console.log(data)

    return data;
}

const getBlogDB = async(id) => {
    console.log(`Retrieving Blog (#${id}) `);

    const [ data ] = await pool.query(`SELECT * FROM Blog WHERE blog_id=${id};`);
    // console.log(data);

    return data;
}

const updateBlogDB = async(id, title, subtitle, body) => {
    console.log(`Updating Blog (#${id})`);
    
    const [ data ] = await pool.query(`UPDATE Blog SET title=${title} subtitle=${subtitle} body=${body} WHERE blog_id=${id};`)
    // console.log(data);
    
    return data;
}

const deleteBlogDB = async(id) => {
    console.log(`Deleting Blog (#${id})`);

    const [ data ] = await pool.query(`DELETE FROM BLOG WHERE blog_id=${id};`)
    // console.log(data);

    return data;
}

export { 
    createBlogDB, 
    getBlogDB,
    getAllBlogsDB,
    updateBlogDB,
    deleteBlogDB, 
    createUserDB, 
    getUserDB, 
    getAllUsersDB, 
    deleteUserDB, 
    updateUserDB,
    verifyUserDB 
};
