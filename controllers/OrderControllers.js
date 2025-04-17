import OrderModel from "../models/OrderModel.js";

const orders =[
{
    customer_id:"asd",
    product_name:'Engine'
}
]
export const getAllOrders = async (req,res)=>{
    const all_orders = await OrderModel.find()
    if(!all_orders){
        return res.status(404).json({error: "No Order Found"})
    }
    res.status(200).json({orders: all_orders})
}

export const getOrderByOrderId = async (req,res)=>{
    const{customer_id, order_id}=req.params
    const get_by_OrderId = await OrderModel.find({_id: order_id,customer_id:customer_id })
    if(!get_by_OrderId){
        return res.status(404).json({error:"There is no such order"})
    }
    res.status(200).json({orders: get_by_OrderId})
}

export const createOrder = async(req,res)=>{

    const {customer_id, products,total_price} = req.body
    const create_order = await OrderModel.create({customer_id,products,total_price})
    if(!create_order){
        return res.status(400).json({error:"Order Failed"})
    }
    res.status(200).json({orders: create_order})
}

export const getOrdersByCustomerId = async(req,res)=>{
    const {customer_id}=req.params
    const all_orders = await OrderModel.find({customer_id: customer_id})
    res.status(200).json({orders: all_orders})
}