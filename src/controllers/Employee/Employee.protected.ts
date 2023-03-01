import { NextFunction, Response } from "express";
import Employee from "../../models/Employee";
import { validationResult } from "express-validator";
import { Request } from "express-jwt";

export const readEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;

  try {
    const employee = await Employee.findOne({ email });
    return employee
      ? res.json(employee).status(200)
      : res.json({ message: "Employee not found." }).status(404);
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.json({ error: "Something went wrong." }).status(500);
  }
};

export const readAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await Employee.find().select("-_id");
    return res.json(employees).status(200);
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.json({ error: "Something went wrong." }).status(500);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() }).status(400);
  }

  const { email } = req.auth!;

  if (req.body.email) {
    return res
      .json({
        error: "Cannot update email at this time.",
      })
      .status(401);
  }

  try {
    const employee = await Employee.findOne({ email });
    if (employee) {
      employee.set(req.body);
      await employee.save();
      return res.json({ message: "Employee updated." }).status(201);
    }
    return res.json({ message: "Employee not found." }).status(404);
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.json({ error: "Something went wrong." }).status(500);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() }).status(400);
  }

  const { email } = req.auth!;

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.json({ message: "Employee not found." }).status(404);
    }

    await Employee.deleteOne({ email });

    return res.json({ message: "Employee deleted successfully." }).status(200);
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.json({ error: "Something went wrong." }).status(500);
  }
};
