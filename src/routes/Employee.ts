import {
  createEmployee,
  deleteEmployee,
  readAllEmployees,
  readEmployee,
  updateEmployee,
} from "./../controllers/Employee";
import express from "express";

const router = express.Router();

router.post("/employees", createEmployee);
router.get("/employees/:employeeId", readEmployee);
router.get("/employees", readAllEmployees);
router.patch("/employees/:employeeId", updateEmployee);
router.delete("/employees/:employeeId", deleteEmployee);

export = router;
