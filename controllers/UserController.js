import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDB, deleteUserDB, getAllUsersDB, getUserDB, pool, updateUserDB } from "../utils/database.js";

class UserController { 
    constructor(user_id, email, username, password, isEmailVerified, blog_id){
        this.user_id = user_id;
        this.email = email;
        this.username = username; 
        this.password = password;
        this.isEmailVerified = isEmailVerified
        // this.blog_id = blog_id;
    }

    AuthenticateUserRegister(body){
        const schema = Joi.object({
            email: Joi.string().min(8).required().email(),
            username: Joi.string().min(3).required(),
            password: Joi.string().min(6),
        });
        return schema.validate(body);
    }

    AuthenticateUserLogin(body){
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        });
        return schema.validate(body);
    }

    async createUser(res)
    {
        // Authenticate the Body
        const { error } = this.AuthenticateUserRegister({ email: this.email, username: this.username, password: this.password });
        if (error) return res.status(400).send(error.details[0].message); 

        // Hashing Password 
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(this.password, salt);

        // need to add authentication
        const user = await createUserDB(this.email, this.username, hashedpassword, res)

        res.send(user);
    }

    async loginUser(res)
    {
        const _user = { email: this.email, password: this.password };
        const { error } = this.AuthenticateUserLogin(_user);
        if (error) return res.status(400).send(error.details[0].message); 

        const [ data ]= await pool.query(`SELECT * FROM USER WHERE email='${this.email}'`);
        this.user_id = data[0].user_id;

        getUserDB(this.user_id);
        if(!this.user_id)
        {
            return res.status(404).send("User credentials doesn't exist");
        }    

         // CHECKING IF OUR PASSWORD IS VALID

        const validPassword = await bcrypt.compare(this.password, data[0].password);
        if(!validPassword) {
            console.log("Invalid Email or Password.");
            return res.status(400).send("Invalid Email or Password.")
        };
    
         // Assigning new JWT Token and HTTP Header

        const token = jwt.sign({ _id: this.user_id }, "F6]#5[4l;4e5r]tlgre'hgfdhgfd';k54o#tlrlkgfdh'k45'ky'46ky54yj'dfh;j546';tjhgdfs;gfsdjgjhsdf" , {
            expiresIn: "7 days",
        });
        res.header('verification-token', token).send({ msg: "Welcome back " + this.email + "!", token: token });
    }

    async getUser(res)
    {
        const user = await getUserDB(this.user_id);
        res.send(user);
    }

    async updateUser(res)
    {
        const user = await updateUserDB(this.id, this.username);

        res.send("Account Successfully Updated: ", user[0].email);
    }

    async deleteUser(res)
    {
        const user = await deleteUserDB(this.user_id);

        res.status(200).send("Account Sucessfully Deleted");
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