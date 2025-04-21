import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer_email:{
        type: String,
        required: true,
    },
    products:{
        type: [[mongoose.Schema.Types.ObjectId, Number]],
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
}, {timestamps: true});

const OrderModel = mongoose.model('order',OrderSchema);
export default OrderModel;