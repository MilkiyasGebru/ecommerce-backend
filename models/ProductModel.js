import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: true,
        },
        product_description: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        sales_count: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        seller: {
            type: String,
            required: true,
        },
        seller_email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel;