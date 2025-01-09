import { Router } from "express";
import { createUserEndpoint, deleteUserEndpoint, getAllUsersEndpoint, getUserEndpoint, loginUserEndpoint, updateUserEndpoint } from "../utils/endpoints.js";
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

UserRouter.put(updateUserEndpoint, async(req, res) => {
   user.user_id = parseInt(req.params.id);
   user.username = req.body.username;

   user.updateUser(res);
})

UserRouter.delete(deleteUserEndpoint, async(req, res) => {
   user.user_id = parseInt(req.params.id);

   user.deleteUser(res)
})

UserRouter.get(getUserEndpoint, (req, res) => {
   user.user_id = parseInt(req.params.id); 
   user.getUser(res)
});

UserRouter.get(getAllUsersEndpoint, (req, res) => {
   user.getAllUsers(res);
});

export default UserRouter;