import {
  createValidator,
  updateValidator,
} from "./../middlewares/Employee.route.validator";
import {
  createEmployee,
  deleteEmployee,
  readAllEmployees,
  readEmployee,
  updateEmployee,
} from "./../controllers/Employee";
import express from "express";

const router = express.Router();

router.post("/employees", createValidator, createEmployee);
router.get("/employees/:email", readEmployee);
router.get("/employees", readAllEmployees);
router.put("/employees", updateValidator, updateEmployee);
router.delete("/employees/:_id", deleteEmployee);

export = router;
