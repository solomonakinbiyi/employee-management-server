import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Employee from "../../models/Employee";
import { hashPassword } from "../Authentication/helpers/auth";
import { validationResult } from "express-validator";

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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

  // hash password
  const hashedPassword = await hashPassword(password);

  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    firstname,
    lastname,
    email,
    password: hashedPassword,
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
      return res.status(400).json({
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
