import { hashPassword } from "./../../../Authentication/helpers/auth";
import { createEmployee } from "../../Employee.unprotected";
import httpMocks from "node-mocks-http";
import { NextFunction, Request, Response } from "express";
import Employee from "../../../../models/Employee";
const newEmployee = require("../mock-data/new-employee.json");

jest.mock("../../../../models/Employee.ts");

let req: Request, res: Response, next: NextFunction;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("createEmployee controller", () => {
  it("should have a createEmployee method", () => {
    expect(typeof createEmployee).toBe("function");
  });
  it("should hash user password", async () => {
    req.body.password = newEmployee["password"];
    await createEmployee(req, res, next);
    const data = await hashPassword(newEmployee["password"]);
    expect(data).toBeTruthy();
  });
  it("should call Employee.findOne", async () => {
    req.body.email = newEmployee["email"];
    await createEmployee(req, res, next);
    expect(Employee.findOne).toBeCalledWith({ email: newEmployee["email"] });
  });
});
