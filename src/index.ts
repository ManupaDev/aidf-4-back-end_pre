import cors from "cors";
import "dotenv/config";
import express from "express";
import GlobalErrorHandlingMiddleware from "./api/middleware/global-error-handler";
import { connectDB } from "./infrastructure/db";
import hotelsRouter from "./api/hotel";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/hotels", hotelsRouter);

app.use(GlobalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
