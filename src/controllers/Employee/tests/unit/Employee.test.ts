import { hashPassword } from "./../../../Authentication/helpers/auth";
import { createEmployee } from "../../Employee.unprotected";
import { readEmployee } from "../../Employee.protected";
import httpMocks from "node-mocks-http";
import { NextFunction, Request, Response } from "express";
import Employee from "../../../../models/Employee";
const newEmployee = require("../mock-data/new-employee.json");

jest.mock("../../../../models/Employee.ts");

interface ICustomRequest extends Response {
  _isEndCalled(): any;
  _getJSONData(): any;
}

let req: Request, res: ICustomRequest, next: NextFunction;

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
  it("should return json body of Email already exists. and response code 400", async () => {
    (Employee.findOne as jest.Mock).mockReturnValue(newEmployee);
    req.body.email = newEmployee["email"];
    await createEmployee(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({
      error: "Email already exists.",
    });
  });
  it("should return json body of Empoyee created successfully. and status code of 200", async () => {
    (Employee.findOne as jest.Mock).mockReturnValue(null);
    req.body.email = newEmployee["email"];
    await createEmployee(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({
      message: "Empoyee created successfully.",
    });
  });
});

describe("readEmployee controller", () => {
  it("should have a readEmployee method", () => {
    expect(typeof readEmployee).toBe("function");
  });
});
