import { body, ValidationChain, param } from "express-validator";

export const createValidator: ValidationChain[] = [
  body("firstname")
    .not()
    .isEmpty()
    .withMessage("Firstname is mandatory.")
    .trim()
    .isString()
    .withMessage("Firstname needs to be in a text format."),
  body("lastname")
    .not()
    .isEmpty()
    .withMessage("Lastname is mandatory.")
    .isString()
    .withMessage("Lastname needs to be in a text format."),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is mandatory.")
    .isString()
    .withMessage("Email needs to be in a text format."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is mandatory.")
    .isString()
    .withMessage("Password needs to be in a text format."),
  body("street")
    .not()
    .isEmpty()
    .withMessage("Street is mandatory.")
    .isString()
    .withMessage("Street needs to be in a text format."),
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is mandatory.")
    .isString()
    .withMessage("City needs to be in a text format."),
  body("state")
    .not()
    .isEmpty()
    .withMessage("State is mandatory.")
    .isString()
    .withMessage("State needs to be in a text format."),
  body("zipcode")
    .not()
    .isEmpty()
    .withMessage("Zipcode is mandatory.")
    .isString()
    .withMessage("Zipcode needs to be in a text format."),
  body("country")
    .not()
    .isEmpty()
    .withMessage("Country is mandatory.")
    .isString()
    .withMessage("Country needs to be in a text format."),
  body("phone")
    .not()
    .isEmpty()
    .withMessage("Phone is mandatory.")
    .isString()
    .withMessage("Phone needs to be in a text format."),
];

export const updateValidator: ValidationChain[] = [
  body("id")
    .not()
    .isEmpty()
    .withMessage("The task id is mandatory")
    .trim()
    .isString()
    .withMessage("Id needs to be a valid uuid format"),
];
