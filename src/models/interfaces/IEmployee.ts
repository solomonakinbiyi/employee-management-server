import { Types } from "mongoose";
import { Status } from "../enums/Status";

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
  status: Status;
}
