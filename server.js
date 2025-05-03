import express from 'express';
import cors from 'cors';
import {connectToDB} from "./config/db.js";
import product_router from "./routers/ProductRouters.js";
import order_router from "./routers/OrderRouters.js";
import user_router from "./routers/UserRouters.js";

const app = express();
const corsOptions = {
    origin: ["https://autoshoopa.vercel.app"], // Or an array of allowed origins
    methods:['GET', 'PUT', 'POST']  ,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you need to handle cookies
    maxAge: 3600,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/products", product_router)
app.use("/api/orders", order_router)
app.use("/api/auth", user_router)


connectToDB().then(()=>{

    app.listen(8080, ()=>{
        console.log("Server running on port 8080");
    });

})
