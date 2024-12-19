import express from "express";
import AuthController from "../controller/AuthController.js";
let routes = express.Router();
routes
    .post('/login',AuthController.login)
    .post('/register',AuthController.register)

export default routes;