import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstname,
    lastname,
    email,
    password,
    street,
    city,
    state,
    zipcode,
    country,
    phone,
  } = req.body;

  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    firstname,
    lastname,
    email,
    password,
    street,
    city,
    state,
    zipcode,
    country,
    phone,
  });

  try {
    await employee.save();
    return res.status(200).json({ message: "Empoyee created successfully." });
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const readEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employeeId = req.params.employeeId;

  try {
    const employee = await Employee.findById(employeeId);
    return employee
      ? res.status(200).json(employee)
      : res.status(404).json({ message: "Not found." });
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
    const employees = await Employee.find();
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
  const employeeId = req.params.employeeId;

  try {
    const employee = await Employee.findById(employeeId);
    if (employee) {
      employee.set(req.body);
      await employee.save();
      return res.status(201).json(employee);
    }
    return res.status(404).json({ message: "Not found." });
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
  const employeeId = req.params.employeeId;

  try {
    const employee = await Employee.findByIdAndDelete(employeeId);
    return employee
      ? res.status(200).json({ message: "Employee deleted." })
      : res.status(404).json({ message: "Not found." });
  } catch (_error) {
    console.log(
      `Something went wrong while creating a new employee. 💩 Error: ${_error}`
    );
    res.status(500).json({ error: "Something went wrong." });
  }
};
