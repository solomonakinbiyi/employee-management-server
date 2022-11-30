import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";

const router = express();

mongoose
  .connect(config.mongo.url)
  .then(() => console.log("Database connected 🛠"))
  .catch((_error) =>
    console.log("Error while connecting to Database ===> ", _error)
  );
