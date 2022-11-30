import { config } from "./config/config";
import express, { json, NextFunction, Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import employeeRoutes from "./routes/Employee";

const router = express();

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info(`Database connected 🎂`);
    StartServer();
  })
  .catch((_error) => {
    Logging.error("Error while connecting to Database ===> ");
    Logging.error(_error);
  });

const StartServer = () => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    Logging.info(
      `Incomming ==> Method : [${req.method}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      // Log the Response
      Logging.info(
        `Incomming ==> Method : [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`
      );
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));

  router.use(express.json());

  // Roules of API
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      return res.status(200).json({});
    }
    next();
  });

  // Routes
  router.use("/employees", employeeRoutes);

  // Health check
  router.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "UP 🔥🔧🎂" });
  });

  // Error handling
  router.use((req: Request, res: Response) => {
    const _error = new Error("Url not found 😟");
    Logging.error(_error);
    return res.status(404).json({ message: _error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port} 🔥🔧`)
    );
};
