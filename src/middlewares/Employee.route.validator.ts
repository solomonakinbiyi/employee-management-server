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
    .trim()
    .isString()
    .withMessage("Lastname needs to be in a text format."),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is mandatory.")
    .trim()
    .isString()
    .withMessage("Email needs to be in a text format."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is mandatory.")
    .trim()
    .isString()
    .withMessage("Password needs to be in a text format."),
  body("street")
    .not()
    .isEmpty()
    .withMessage("Street is mandatory.")
    .trim()
    .isString()
    .withMessage("Street needs to be in a text format."),
  body("city")
    .not()
    .isEmpty()
    .withMessage("City is mandatory.")
    .trim()
    .isString()
    .withMessage("City needs to be in a text format."),
  body("state")
    .not()
    .isEmpty()
    .withMessage("State is mandatory.")
    .trim()
    .isString()
    .withMessage("State needs to be in a text format."),
  body("zipcode")
    .not()
    .isEmpty()
    .withMessage("Zipcode is mandatory.")
    .trim()
    .isString()
    .withMessage("Zipcode needs to be in a text format."),
  body("country")
    .not()
    .isEmpty()
    .withMessage("Country is mandatory.")
    .trim()
    .isString()
    .withMessage("Country needs to be in a text format."),
  body("phone")
    .not()
    .isEmpty()
    .withMessage("Phone is mandatory.")
    .trim()
    .isString()
    .withMessage("Phone needs to be in a text format."),
];

export const updateValidator: ValidationChain[] = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is mandatory.")
    .trim()
    .isString()
    .withMessage("Email needs to be in a text format."),
  body("firstname")
    .optional()
    .isString()
    .withMessage("Firstname needs to be in a text format."),
  body("lastname")
    .optional()
    .isString()
    .withMessage("Lastname needs to be in a text format."),
  body("password")
    .optional()
    .isString()
    .withMessage("Password needs to be in a text format."),
  body("street")
    .optional()
    .isString()
    .withMessage("Street needs to be in a text format."),
  body("city")
    .optional()
    .isString()
    .withMessage("City needs to be in a text format."),
  body("state")
    .optional()
    .isString()
    .withMessage("State needs to be in a text format."),
  body("zipcode")
    .optional()
    .isString()
    .withMessage("Zipcode needs to be in a text format."),
  body("country")
    .optional()
    .isString()
    .withMessage("Country needs to be in a text format."),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone needs to be in a text format."),
];
