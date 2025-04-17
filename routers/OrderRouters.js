import express from 'express';
import {getAllOrders, getOrderByOrderId} from "../controllers/OrderControllers.js";

const order_router = express.Router();

order_router.get('/',getAllOrders)
order_router.get('/:id',getOrderByOrderId)

export default order_router;