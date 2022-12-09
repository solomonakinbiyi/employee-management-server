import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {
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

  firstname = firstname.toLowerCase();
  lastname = lastname.toLowerCase();
  email = email.toLowerCase();
  password = password.toLowerCase();
  street = street.toLowerCase();
  city = city.toLowerCase();
  state = state.toLowerCase();
  zipcode = zipcode.toLowerCase();
  country = country.toLowerCase();
  phone = phone.toLowerCase();

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
    const emailExists = await Employee.findOne({ email });
    if (emailExists) {
      return res.json({
        error: "Email already exists.",
      });
    }

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
  const { email } = req.params;

  try {
    const employee = await Employee.findOne({ email });
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
  const { email } = req.params;

  try {
    const employee = await Employee.findOne({ email });
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
  const { _id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(_id);
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

