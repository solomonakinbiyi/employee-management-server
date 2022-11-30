import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee";

const create = (req: Request, res: Response, next: NextFunction) => {
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
