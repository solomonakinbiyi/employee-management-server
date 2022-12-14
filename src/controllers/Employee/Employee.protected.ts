import { NextFunction, Response } from "express";
import Employee from "../../models/Employee";
import { validationResult } from "express-validator";
import { Request } from "express-jwt";

export const readEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.auth!;

  try {
    const employee = await Employee.findOne({ email }).select("-_id");
    return employee
      ? res.status(200).json(employee)
      : res.status(404).json({ message: "Employee not found." });
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const readAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await Employee.find().select("-_id");
    return res.status(200).json(employees);
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.auth!;

  try {
    const employee = await Employee.findOne({ email });
    if (employee) {
      employee.set(req.body);
      await employee.save();
      return res.status(201).json({ message: "Employee updated." });
    }
    return res.status(404).json({ message: "Employee not found." });
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.auth!;

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    await Employee.deleteOne({ email });

    return res.status(200).json({ message: "Employee deleted successfully." });
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.status(500).json({ error: "Something went wrong." });
  }
};
