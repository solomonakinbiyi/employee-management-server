import {
  createValidator,
  deleteValidator,
  readValidator,
  signinValidator,
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
import { signin } from "../controllers/Authentication/Employee";

const router = express.Router();

router.post("/employees", createValidator, createEmployee);
router.get("/employees/:email", readValidator, readEmployee);
router.get("/employees", readAllEmployees);
router.put("/employees", updateValidator, updateEmployee);
router.delete("/employees/:email", deleteValidator, deleteEmployee);

// authentication
router.post("/employees/signin", signinValidator, signin);

export = router;
