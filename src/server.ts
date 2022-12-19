import { config } from "./config/config";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  Express,
} from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import employeeRoutes from "./routes/Employee";
import cors from "cors";

const router: Express = express();

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

  router.use(express.json());

  router.use(express.urlencoded({ extended: true }));

  // Cors
  router.use(cors());

  // Routes
  router.use("/api", employeeRoutes);

  // Health check
  router.get("/health", (req: Request, res: Response) => {
    res.json({ status: "UP 🔥🔧🎂" }).status(200);
  });

  // Error handling
  router.use((req: Request, res: Response) => {
    const _error = new Error("Url not found 😟");
    Logging.error(_error);
    return res.json({ message: _error.message }).status(400);
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port} 🔥🔧`)
    );
};
