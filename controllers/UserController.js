import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDB, deleteUserDB, getAllUsersDB, getUserDB, pool, updateUserDB, verifyUserDB } from "../utils/database.js";
import mail from "../utils/mail.js";

class UserController { 
    constructor(user_id, email, username, password, isEmailVerified, token/*, blog_id */ ){
        this.token = token;
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
        if (error) return res.status(400).send({type: "error", message: error.details[0].message}); 

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
        if (error) return res.status(400).send({type: "error", message: error.details[0].message }); 

        const [ data ]= await pool.query(`SELECT * FROM User WHERE email='${this.email}'`);
        this.user_id = data[0].user_id;

        if(!this.user_id)
        {
            return res.status(404).send("User credentials doesn't exist");
        }    
        
        getUserDB(this.user_id);
         // CHECKING IF OUR PASSWORD IS VALID

        const validPassword = await bcrypt.compare(this.password, data[0].password);
        if(!validPassword) {
            console.log("Invalid Email or Password.");
            return res.status(400).send({ type: "error", message: "Invalid Email or Password." });
        };
    
         // Assigning new JWT Token and HTTP Header

        const token = jwt.sign({ _id: this.user_id }, process.env.JWT_TOKEN , {
            expiresIn: "7 days",
        });
        res.header('verification-token', token).send({ type: "success", message: "Welcome back " + this.email + "!", token: token });
    }

    async emailUser(res)
    {

        // breaking down the token

        const decoded = jwt.verify(this.token, process.env.JWT_TOKEN);
        // console.log(decoded); OUTPUT { _id: number, iat: number, exp: number }
        this.user_id = decoded._id;

        const user = await getUserDB(this.user_id);
        this.email = user[0].email;
        
        // sign new token

        const token = jwt.sign({ email: this.email }, process.env.JWT_TOKEN , {
            expiresIn: "10 minutes",
        });

        // send the email

        const info = await mail.sendMail({
            from: `"Shopablog" <${process.env.mail_email}>`, // sender address
            to: this.email, // list of receivers
            subject: "Email Verification", // Subject line
            text: `Hello, ${this.email}`, // plain text body
            html: `
                <h1>Hello, ${this.email}</h1>
                <p>To Verify your account please click the button below...</p>
                <button>
                    <a href="${process.env.FRONTEND_URL}verify?token=${token}">
                        Verify
                    </a>
                </button>
            `, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          res.send("Email Sent");
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
        await deleteUserDB(this.user_id);

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
