import { createEmployee } from "../../Employee.unprotected";
import httpMocks from "node-mocks-http";
import { NextFunction, Request, Response } from "express";

jest.mock("../../../../models/Employee.ts");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("createEmployee controller", () => {
  it("", () => {
    expect(typeof createEmployee).toBe("function");
  });
});
