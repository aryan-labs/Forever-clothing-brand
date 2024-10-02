import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path";

import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./Routes/userRoutes.js";
import { connectDb } from "./config/db.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDb();

// middlewares
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
