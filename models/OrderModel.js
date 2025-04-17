import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
    },
    products:{
        type: [[mongoose.Schema.Types.ObjectId, Number]],
        required: true,
    }
}, {timestamps: true});

const OrderModel = mongoose.model('order',OrderSchema);
export default OrderModel;