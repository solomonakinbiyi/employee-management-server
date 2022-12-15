import {
  createValidator,
  deleteValidator,
  readValidator,
  signinValidator,
  updateValidator,
} from "./../middlewares/Employee.route.validator";
import {
  deleteEmployee,
  readAllEmployees,
  readEmployee,
  updateEmployee,
} from "../controllers/Employee/Employee.protected";
import { createEmployee } from "../controllers/Employee/Employee.unprotected";
import express from "express";
import { signin } from "../controllers/Authentication/Employee";
import { requireSignIn } from "../controllers/Authentication/helpers/auth";

const router = express.Router();

router.post("/employees", createValidator, createEmployee);

// protected routes
router.get("/employees/:email", requireSignIn, readValidator, readEmployee);
router.get("/employees", requireSignIn, readAllEmployees);
router.put("/employees", requireSignIn, updateValidator, updateEmployee);
router.delete("/employees", requireSignIn, deleteValidator, deleteEmployee);

// authentication
router.post("/employees/signin", signinValidator, signin);

export = router;
