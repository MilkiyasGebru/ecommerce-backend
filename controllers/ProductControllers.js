import ProductModel from "../models/ProductModel.js";
import productModel from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";
import { ENV_VARS } from "../config/env_var.js";
import * as fs from "node:fs";

cloudinary.config({
    cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_VARS.CLOUDINARY_API_KEY,
    api_secret: ENV_VARS.CLOUDINARY_API_SECRET,
});

export const getLatestProducts = async (req, res) => {
    const latest_products = await ProductModel.find({})
        .sort({ createdAt: -1 })
        .limit(10);
    if (!latest_products) {
        return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products: latest_products });
};

export const getTrendingProducts = async (req, res) => {
    const trending_products = await ProductModel.find({})
        .sort({ sales_count: -1 })
        .limit(10);
    res.status(200).json({ products: trending_products });
};

export const getAllProducts = async (req, res) => {
    const { categories, brands, year, year2, minimum, maximum } = req.query;
    console.log("This is the request ", req.query);
    console.log(minimum, maximum);
    const filter_options = {};

    if (categories) {
        filter_options.category = categories.split(",");
    }
    if (brands) {
        filter_options.brand = brands.split(",");
    }
    if (year && year2) {
        filter_options.year = {
            $gte: parseInt(year, 10),
            $lte: parseInt(year2, 10),
        };
    }
    if (minimum && maximum) {
        filter_options.price = {
            $gte: parseInt(minimum, 10),
            $lte: parseInt(maximum, 10),
        };
    }
    const all_products = await ProductModel.find(filter_options);
    if (!all_products) {
        return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products: all_products });
    console.log(filter_options.year);
    console.log(filter_options);
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.query;
    const arr = category.split(",");
    const get_by_category = await productModel.find({ category: { $in: arr } });
    res.status(200).json(get_by_category);
};

export const getProductsByBrand = async (req, res) => {
    const { brand } = req.query;
    const arr = brand.split(",");
    const get_by_brand = await ProductModel.find({ brand: { $in: arr } });
    res.status(200).json(get_by_brand);
};

export const createProduct = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const {
        product_name,
        year,
        brand,
        quantity,
        category,
        price,
        description,
        seller,
        seller_email,
    } = req.body;
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error("Failed to delete the file:", err);
        } else {
            console.log("Temporary file deleted:", req.file.path);
        }
    });
    const product_added = await ProductModel.create({
        product_name,
        year,
        brand,
        quantity,
        category,
        price,
        product_description: description,
        image: result.url,
        seller,
        seller_email,
    });
    return res.status(201).json({ message: "Product Added" });
};

export const getProductsBySeller = async (req, res) => {
    try {
        const { seller } = req.query;
        const products = await ProductModel.find({ seller });
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching seller products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        product_name,
        year,
        brand,
        quantity,
        category,
        price,
        description,
        seller,
        seller_email,
    } = req.body;

    try {
        const updateData = {
            product_name,
            year,
            brand,
            quantity,
            category,
            price,
            product_description: description,
            seller,
            seller_email,
        };

        // If a new image is uploaded, update the image URL
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updateData.image = result.url;
            // Delete the temporary file
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Failed to delete the file:", err);
                } else {
                    console.log("Temporary file deleted:", req.file.path);
                }
            });
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res
            .status(200)
            .json({
                message: "Product updated successfully",
                product: updatedProduct,
            });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};