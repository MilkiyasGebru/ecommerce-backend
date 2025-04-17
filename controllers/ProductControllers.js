import ProductModel from "../models/ProductModel.js";
import productModel from "../models/ProductModel.js";

const products = [
    {
        product_name: "tires",
        category: "Tire",
        brand: "BMW",
        price: 100,
    },
    {
        product_name: "suspension",
        category: "Suspension",
        brand: "Tesla",
        price: 210,
    },
    {
        product_name: "car paint",
        category: "Paint",
        brand: "Toyota",
        price: 53,
    },
    {
        product_name: "Head Light",
        category: "Light",
        brand: "BMW",
        price: 11.23,
    },
    {
        product_name: "engine",
        category: "Engine",
        brand: "Honda",
        price: 1451,
    },
]

export const getLatestProducts = async (req,res)=>{


    const latest_products = await ProductModel.find({}).sort({createdAt: -1}).limit(2)
    if (!latest_products){
        return res.status(404).json({message:"No products found"})
    }
    res.status(200).json({products: latest_products})
}

export const getTrendingProducts = async (req,res)=>{
    const trending_products = await ProductModel.find().sort({sales_count: -1}).limit(1)
    res.status(200).json({products: trending_products})
}

export const getAllProducts = async (req,res)=>{

    const {categories, brands} = req.query
    const filter_options = {}
    if (categories){
        filter_options.category = categories.split(",")
    }
    if (brands){
        filter_options.brand = brands.split(",")
    }
    const all_products = await ProductModel.find(filter_options)
    if(!all_products){
        return res.status(404).json({message:"No products found"})
    }
    res.status(200).json({products: all_products})
}

export const getProductsByCategory = async(req,res)=>{
    const { category } = req.query;
    const arr = category.split(",");
    const get_by_category = await productModel.find({category: {$in:arr}})
    res.status(200).json(get_by_category)

}

export const getProductsByBrand = async(req,res)=>{
    const { brand } = req.query;
    const arr = brand.split(",");
    const get_by_brand = await ProductModel.find({brand: {$in:arr}})
    res.status(200).json(get_by_brand)
}

export const addProduct = async (req, res)=>{
    const {product_name, brand, category, price, description} = req.body
    await ProductModel.create({product_name, brand, category, price, product_description:description})
    return res.status(201).json({message:"Product Added"})
}