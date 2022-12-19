import { NextFunction, Request, Response } from "express";
import Employee from "../../models/Employee";
import { comparePassword } from "./helpers/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .json({
        errors: errors.array(),
      })
      .status(400);
  }

  let { email, password } = req.body;

  email = email.toLowerCase();
  password = password.toLowerCase();

  try {
    // check if db has employee with email
    const userCredentials = await Employee.findOne({ email });
    if (!userCredentials) {
      return res
        .json({
          error: "Email not found",
        })
        .status(400);
    }

    // check if password matches encrypted password
    const match = await comparePassword(password, userCredentials.password);
    if (!match) {
      return res
        .json({
          error: "Wrong password",
        })
        .status(400);
    }

    // create signed token
    const token = jwt.sign(
      { email: userCredentials.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    return res
      .json({
        token,
        email: userCredentials.email,
      })
      .status(200);
  } catch (error) {
    console.log("Sign in failed => ", error);
    return res
      .json({
        error: "Error. Please try again.",
      })
      .status(500);
  }
};
