import express from "express";
import ExpensesController from "../controller/ExpensesController.js";
import AuthController from "../controller/AuthController.js";
import Auth from "../../middleware/Auth.js";

let routes = express.Router();

routes
    .get('/get/:id',Auth.authentication,ExpensesController.getExpenses)
    .get('/user/:user_id',Auth.authentication,ExpensesController.getUserExpenses)
    .get('/category',Auth.authentication,ExpensesController.getCategory)
    .post('/create',Auth.authentication,ExpensesController.storeExpenses)
    .patch('/update/:id',Auth.authentication,ExpensesController.updateExpenses)
    .delete('/delete/:id',Auth.authentication,ExpensesController.deleteExpenses)

export default routes;