import { Router } from "express";
import { createUserEndpoint, getAllUsersEndpoint, getUserEndpoint, loginUserEndpoint } from "../utils/endpoints.js";
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

UserRouter.post(loginUserEndpoint,  async(req, res) => {
   user.email = req.body.email;
   user.password = req.body.password;

   user.loginUser(res);
}); 

UserRouter.get(getUserEndpoint, (req, res) => {
   const id = parseInt(req.params.id); 
   user.getUser(id, res)
});

UserRouter.get(getAllUsersEndpoint, (req, res) => {
   user.getAllUsers(res);
});

export default UserRouter;