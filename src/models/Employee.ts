import mongoose, { Schema, Types } from "mongoose";

export interface IEmpoyee {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

export interface IEmployeeModel extends IEmpoyee {}

const EmployeeSchema = new mongoose.Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "_id" },
    firstname: { type: "string", required: true },
    lastname: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    street: { type: "string", required: true },
    city: { type: "string", required: true },
    state: { type: "string", required: true },
    zipcode: { type: "string", required: true },
    country: { type: "string", required: true },
    phone: { type: "string", required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);
