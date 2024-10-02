import express from "express";
import {
  addClothes,
  listclothes,
  removeclothes,
  singleProduct,
} from "../controllers/clothesController.js";
import multer from "multer";

const clothesRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
clothesRouter.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addClothes
);
clothesRouter.get("/list", listclothes);
clothesRouter.post("/remove", removeclothes);
clothesRouter.post("/single", singleProduct);
export default clothesRouter;
