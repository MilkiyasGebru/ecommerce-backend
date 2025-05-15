import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
import { ENV_VARS } from "../config/env_var.js";
import stripe from "stripe";

export const getAllOrders = async (req, res) => {
    const all_orders = await OrderModel.find();
    if (!all_orders) {
        return res.status(404).json({ error: "No Order Found" });
    }
    res.status(200).json({ orders: all_orders });
};

export const getOrderByOrderId = async (req, res) => {
    const { order_id } = req.params;
    const get_by_OrderId = await OrderModel.findOne({ order_id: order_id });
    if (!get_by_OrderId) {
        return res.status(404).json({ error: "There is no such order" });
    }
    res.status(200).json({ orders: get_by_OrderId });
};

export const createOrder = async (req, res) => {
    const { customer_id, customer_email, products, total_price } = req.body;
    console.log(customer_id, customer_id, products, total_price, customer_email);
    const create_order = await OrderModel.create({
        customer_id,
        products,
        total_price,
        customer_email,
    });
    if (!create_order) {
        return res.status(400).json({ error: "Order Failed" });
    }
    res.status(200).json({ orders: create_order });
};

export const getOrdersByCustomerId = async (req, res) => {
    const { customer_id } = req.params;
    const all_orders = await OrderModel.find({ customer_id: customer_id });
    res.status(200).json({ orders: all_orders });
};

export const handleCheckOutSession = async (req, res) => {
    const _stripe = stripe(ENV_VARS.STRIPE_API_KEY);
    const products = req.body;

    try {
        for (const [productId, [quantity, price]] of Object.entries(products)) {
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res
                    .status(404)
                    .json({ error: "Product with ID ${productId} not found" });
            }
            if (product.quantity < quantity) {
                return res.status(400).json({
                    error: "Insufficient quantity for product ${product.product_name}. Available: ${product.quantity}, Requested: ${quantity}",
            });
            }
        }
    } catch (error) {
        console.error("Error checking product quantities:", error);
        return res
            .status(500)
            .json({ error: "Failed to verify product quantities" });
    }

    const items = Object.entries(products).map((item) => {
        return {
            price_data: {
                currency: "etb",
                product_data: {
                    name: item[0],
                },
                unit_amount: item[1][1] * 100,
            },
            quantity: item[1][0],
        };
    });

    const session = await _stripe.checkout.sessions.create({
        line_items: items,
        metadata: {
            orderId: "order_abc123",
            cart: JSON.stringify([
                {
                    sellerName: "Kidus Gebremichael",
                    sellerId: "user_456",
                    stripeAccountId: "acct_1ExampleB",
                    amount: 3000,
                },
            ]),
        },
        mode: "payment",
        success_url: `https://autoshoopa.vercel.app/Confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`https://autoshoopa.vercel.app/shop`,
});

    try {
        for (const [productId, [quantity, price]] of Object.entries(products)) {
            await ProductModel.findByIdAndUpdate(productId, {
                $inc: {
                    quantity: -quantity,
                    sales_count: quantity,
                },
            });
        }
    } catch (error) {
        console.error("Error updating product quantities and sales count:", error);
        return res
            .status(500)
            .json({ error: "Failed to update product quantities and sales count" });
    }

    res.json({ status_code: 303, url: session.url });
};

export const getByOrderEmail = async (req, res) => {
    const { email } = req.params;
    console.log("This is the order email requested ", email);
    const getorder = await OrderModel.find({ customer_email: email });
    if (!getorder) {
        return res.status(404).json({ error: "No order found" });
    }
    res.status(200).json({ orders: getorder });
};