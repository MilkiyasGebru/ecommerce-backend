import express from 'express';
import {
    createOrder,
    getAllOrders, getByOrderEmail,
    getOrderByOrderId,
    getOrdersByCustomerId,
    handleCheckOutSession
} from "../controllers/OrderControllers.js";
import stripe from "stripe";
import {ENV_VARS} from "../config/env_var.js";

const order_router = express.Router();

order_router.get('/',getAllOrders)
order_router.post('/create',createOrder)
// order_router.get('/:customer_id',getOrdersByCustomerId)
order_router.get('/:customer_id/:order_id',getOrderByOrderId)
order_router.post("/create-checkout-session",handleCheckOutSession)
order_router.get('/:email',getByOrderEmail)


// const _stripe = stripe(ENV_VARS.STRIPE_API_KEY)

// order_router.post('/create-checkout-session', async (req, res) => {
//
//     const products = req.body
//
//     const items = Object.entries(products).map((item)=>{
//         return {
//             price_data : {
//                 currency : 'usd',
//                 product_data: {
//                     name : item[0]
//                 },
//                 unit_amount: item[1][1]*100
//             },
//             quantity : item[1][0]
//         }
//     })
//
//     const session = await _stripe.checkout.sessions.create({
//         line_items: items,
//         metadata: {
//             orderId: 'order_abc123',
//             cart: JSON.stringify([
//                 {
//                     sellerName: "Milkiyas Gebru",
//                     sellerId: "user_123",
//                     stripeAccountId: "acct_1ExampleA",
//                     amount: 5000,
//                 },
//                 {
//                     sellerName: "Kidus Gebremichael",
//                     sellerId: "user_456",
//                     stripeAccountId: "acct_1ExampleB",
//                     amount: 3000,
//                 },
//             ]),
//         },
//         mode: 'payment',
//         success_url: `${ENV_VARS.BACKEND_URL}/success`,
//         cancel_url: `${ENV_VARS.BACKEND_URL}/home`,
//     });
//
//
//     res.json({status_code:303,url:session.url});
// });



order_router.post("/handle-stripe", async (req, res) => {
    res.status(200).json({status_code:200});
})

export default order_router;