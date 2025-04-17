import express from 'express';
import {
    getAllProducts,
    getLatestProducts, getProductsByBrand,
    getProductsByCategory,
    getTrendingProducts
} from "../controllers/ProductControllers.js";

const product_router = express.Router();


product_router.get("/latest", getLatestProducts)
product_router.get("/trending",getTrendingProducts)
product_router.get("/",getAllProducts)
product_router.get("/:category",getProductsByCategory)
product_router.get("/brand/:brand",getProductsByBrand)

export default product_router;