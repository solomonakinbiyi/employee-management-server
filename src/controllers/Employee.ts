import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee";

export const createEmployee = (
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

  return employee
    .save()
    .then(() =>
      res.status(200).json({ message: "Empoyee created successfully." })
    )
    .catch((_error) => {
      console.log(
        `Something went wrong while creating a new employee. 💩 Error: ${_error}`
      );
      res.status(500).json({ error: "Something went wrong." });
    });
};

export const readEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employeeId = req.params.employeeId;

  return Employee.findById(employeeId)
    .then((employee) =>
      employee
        ? res.status(200).json({ employee })
        : res.status(404).json({ message: "Not found." })
    )
    .catch((_error) => {
      console.log(
        `Something went wrong while creating a new employee. 💩 Error: ${_error}`
      );
      res.status(500).json({ error: "Something went wrong." });
    });
};

export const readAllEmployees = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Employee.find()
    .then((employees) => res.status(200).json({ employees }))
    .catch((_error) => {
      console.log(
        `Something went wrong while creating a new employee. 💩 Error: ${_error}`
      );
      res.status(500).json({ error: "Something went wrong." });
    });
};

export const updateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employeeId = req.params.employeeId;

  return Employee.findById(employeeId).then((employee) => {
    if (employee) {
      employee.set(req.body);
      return employee
        .save()
        .then((employee) => res.status(201).json({ employee }))
        .catch((_error) => {
          console.log(
            `Something went wrong while creating a new employee. 💩 Error: ${_error}`
          );
          res.status(500).json({ error: "Something went wrong." });
        });
    }
  });
};

export const deleteEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employeeId = req.params.employeeId;

  return Employee.findByIdAndDelete(employeeId)
    .then((employee) => {
      employee
        ? res.status(200).json({ message: "Employee deleted." })
        : res.status(404).json({ message: "Not found." });
    })
    .catch((_error) => {
      console.log(
        `Something went wrong while creating a new employee. 💩 Error: ${_error}`
      );
      res.status(500).json({ error: "Something went wrong." });
    });
};
