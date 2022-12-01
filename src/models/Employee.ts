import mongoose, { Schema, Types } from "mongoose";
import { Status } from "./enums/Status";
import { IEmpoyee } from "./interfaces/IEmployee";

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
    status: { type: "string", enum: Status, default: Status.pending },
  },
  { versionKey: false }
);

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);
