import express from 'express';
import multer from 'multer';
import {
    createProduct,
    getAllProducts,
    getLatestProducts, getProductsByBrand,
    getProductsByCategory,
    getTrendingProducts
} from "../controllers/ProductControllers.js";
import {requireAuth} from "../middleware/RequireAuth.js";

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where you want to save the files
        cb(null, './uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        // Define how the uploaded file should be named
        const uniqueSuffix = Date.now() ;
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});
const upload = multer({ storage: storage });
const product_router = express.Router();


product_router.get("/latest", getLatestProducts)
product_router.get("/trending",getTrendingProducts)
product_router.get("/",getAllProducts)
product_router.get("/:category",getProductsByCategory)
product_router.get("/brand/:brand",getProductsByBrand)
product_router.post("/add",requireAuth,upload.single('photo'), createProduct)

export default product_router;