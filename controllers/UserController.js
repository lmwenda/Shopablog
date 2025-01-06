import { createUserDB, getAllUsersDB, getUserDB } from "../utils/database.js";

class UserController { 
    constructor(user_id, email, username, password, isEmailVerified, blog_id){
        this.user_id = user_id;
        this.email = email;
        this.username = username; 
        this.password = password;
        this.isEmailVerified = isEmailVerified
        this.blog_id = blog_id;
    }

    async createUser()
    {
        // need to add authentication
        const user = await createUserDB(this.email, this.username, this.password)

        res.send(user);
    }

    async getUser(id, res)
    {
        const user = await getUserDB(id);
        res.send(user);
    }

    async getAllUsers(res)
    {
        const users = await getAllUsersDB();
        res.send(users);
        /* for(let i=0; i<=users.length; i++)
        {
            res.send(users[i]);
        } */
    }
}

export default UserController;