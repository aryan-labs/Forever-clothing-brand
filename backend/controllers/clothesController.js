import express from "express";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import clothesModel from "../models/clothesModel.js";

const addClothes = async (req, res) => {
  const image = req.files.image;

  const clothes = new clothesModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image,
    category: req.body.category,
    subcategory: req.body.subcategory,
    size: req.body.size,
  });

  try {
    await clothes.save();
    res.json({ success: true, message: "Clothes added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const listclothes = async (req, res) => {
  try {
    const clothes = await clothesModel.find({});
    res.json({ success: true, data: clothes });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const removeclothes = async (req, res) => {
  try {
    const clothes = await clothesModel.findById(req.body.id);
    fs.unlink(`uploads/${clothes.image}`, () => {});

    await clothesModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await clothesModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addClothes, listclothes, removeclothes, singleProduct };
