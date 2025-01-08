import Joi from "joi";
import bcrypt from "bcrypt";
import { createUserDB, getAllUsersDB, getUserDB } from "../utils/database.js";

class UserController { 
    constructor(user_id, email, username, password, isEmailVerified, blog_id){
        this.user_id = user_id;
        this.email = email;
        this.username = username; 
        this.password = password;
        this.isEmailVerified = isEmailVerified
        // this.blog_id = blog_id;
    }

    AuthenticateUser(body){
        const schema = Joi.object({
            email: Joi.string().min(8).required().email(),
            username: Joi.string().min(3).required(),
            password: Joi.string().min(6),
        });
        return schema.validate(body);
    }

    async createUser(res)
    {
        // Authenticate the Body
        const { error } = this.AuthenticateUser({ email: this.email, username: this.username, password: this.password });
        if (error) return res.status(400).send(error.details[0].message); 

        // Hashing Password 
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(this.password, salt);

        // need to add authentication
        const user = await createUserDB(this.email, this.username, hashedpassword, res)

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