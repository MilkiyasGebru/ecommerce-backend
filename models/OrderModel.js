import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
    },
    product_name:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const OrderModel = mongoose.model('order',OrderSchema);
export default OrderModel;