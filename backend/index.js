import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import useRouter from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = 9000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

mongoose.connect(process.env.DB).then(
  () => {
    console.log("connected to mongo");
  },
  (err) => {
    console.log("MongoDB error: ", err);
  }
);

app.use("/", useRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
