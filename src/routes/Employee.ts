import { validateSchema, Schemas } from "./../middlewares/ValidateSchema";
import {
  createEmployee,
  deleteEmployee,
  readAllEmployees,
  readEmployee,
  updateEmployee,
} from "./../controllers/Employee";
import express from "express";

const router = express.Router();

router.post(
  "/employees",
  validateSchema(Schemas.employee.createEmployee),
  createEmployee
);
router.get(
  "/employees/:_id",
  validateSchema(Schemas.employee.readEmployee),
  readEmployee
);
router.get("/employees", readAllEmployees);
router.patch(
  "/employees/:_id",
  validateSchema(Schemas.employee.updateEmployee),
  updateEmployee
);
router.delete(
  "/employees/:_id",
  validateSchema(Schemas.employee.deleteEmployee),
  deleteEmployee
);

export = router;
