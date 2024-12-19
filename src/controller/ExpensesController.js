import db from "../../config/db.js";
import responseService from "../services/responseService.js";
export default {
  getExpenses: async function (req, res, next) {
    var query = `SELECT * FROM expenses where id='${req.params.id}'`;
    
    db.query(query, function (err, result, fields) {
      if (err) throw err;
      return responseService.Success(res, result, "success");
    });
  },
  getUserExpenses: async function (req, res, next) {
    var query = `SELECT * FROM expenses where user_id='${req.params.user_id}'`;
    if (req.query.cat_id && req.query.cat_id != "") {
      query = query + `AND category_id='${req.query.cat_id}'`;
    }
    if (req.query.date && req.query.date != "") {
      query = query + `AND expense_date='${req.query.date}'`;
    }
    db.query(query, function (err, result, fields) {
      if (err) throw err;
      return responseService.Success(res, result, "success");
    });
  },
  getCategory: async function (req, res, next) {
    db.query(`SELECT * FROM category`, function (err, result, fields) {
      if (err) throw err;
      return responseService.Success(res, result, "success");
    });
  },
  storeExpenses: async function (req, res, next) {
    db.query(
      `Insert INTO expenses(expense_name,category_id,amount,expense_date,user_id) Values('${req.body.expense_name}','${req.body.category_id}','${req.body.amount}','${req.body.expense_date}','${req.body.user_id}')`,
      function (err, result, fields) {
        if (err) throw err;
        return responseService.Success(res, result, "success");
      }
    );
  },
  updateExpenses: async function (req, res, next) {
    db.query(`UPDATE expenses SET expense_name='${req.body.expense_name}',category_id='${req.body.category_id}',amount='${req.body.amount}',expense_date='${req.body.expense_date}' WHERE id='${req.params.id}'`, function (err, result, fields) {
      if (err) throw err;
      return responseService.Success(res, result, "success");
    });
  },
  deleteExpenses: async function (req, res, next) {
    db.query(`DELETE FROM expenses WHERE id='${req.params.id}'`, function (err, result, fields) {
      if (err) throw err;
      return responseService.Success(res, result, "success");
    });
  },
};
