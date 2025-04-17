import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    Customer_name:{
        type: String,
        required: true
    },
    Customer_mail:{
        type: String,
        required: true
    },
    Customer_password:{
        type: String,
        required: true
    },
    Customer_phone:{
        type: String,
        required: true
    }
})

const CustomerModel = mongoose.model('customer', CustomerSchema);
export default CustomerModel;