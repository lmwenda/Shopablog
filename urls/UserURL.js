import bcrypt from "bcrypt";
import Joi from "joi";
import { Router } from "express";
import { createUserEndpoint, getAllUsersEndpoint, getUserEndpoint } from "../utils/endpoints.js";
import UserController from "../controllers/UserController.js";

const UserRouter = Router();
const user = new UserController();

UserRouter.post(createUserEndpoint, async(req, res) => {
   // Storing Values

   user.email = req.body.email;
   user.username = req.body.username;
   user.password = req.body.password;
   
   // Creaing User
   user.createUser(res);
})

UserRouter.get(getUserEndpoint, (req, res) => {
   const id = parseInt(req.params.id); 
   user.getUser(id, res)
});

UserRouter.get(getAllUsersEndpoint, (req, res) => {
   user.getAllUsers(res);
});

export default UserRouter;