import express from "express";
const Authrouter = express.Router();
import { registerUser,loginUser } from "../controllers/auth.controller.js";

//auth routes
Authrouter.post('/register',registerUser);
Authrouter.post('/login',loginUser);

export default Authrouter;