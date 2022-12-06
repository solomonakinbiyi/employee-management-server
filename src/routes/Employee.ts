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
  createEmployee
);
router.get(
  "/employees/:email",
  readEmployee
);
router.get("/employees", readAllEmployees);
router.patch(
  "/employees/:email",
  updateEmployee
);
router.delete(
  "/employees/:_id",
  deleteEmployee
);

export = router;
