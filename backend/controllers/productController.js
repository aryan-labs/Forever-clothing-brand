import productModel from "../models/productModel.js";
import multer from "multer";
import path from "path";
import fs from 'fs'

// Set up multer storage for a single image
const storage = multer.diskStorage({
  destination:"uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Ensure unique filenames
  },
});

// Middleware for single file upload
const upload = multer({ storage: storage }).single("image1");

// function for add product with a single image
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`; // Multer puts the uploaded file in req.file

    // Check if image was uploaded

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: sizes,
      image: imageUrl, // Save the image path to the product
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Export upload middleware for use in routes

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, upload, addProduct, removeProduct, singleProduct };
