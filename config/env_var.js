import dotenv from "dotenv";
dotenv.config();
export const ENV_VARS = {
    PORT: process.env.PORT || 8080,
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    BACKEND_URL: process.env.BACKEND_URL
}