import { Router } from "express";
import { createUserEndpoint, getAllUsersEndpoint, getUserEndpoint } from "../utils/endpoints.js";
import UserController from "../controllers/UserController.js";

const UserRouter = Router();
const user = new UserController();

UserRouter.post(createUserEndpoint, (req, res) => {
   user.email = req.body.email;
   user.username = req.body.username;
   user.password = req.body.password; // need to check if works

   user.createUser(res);
})

UserRouter.get(getUserEndpoint, (req, res) => {
   const id = parseInt(req.params.id); // need to convert to integer
   user.getUser(id, res)
});

UserRouter.get(getAllUsersEndpoint, (req, res) => {
   user.getAllUsers(res);
});

export default UserRouter;