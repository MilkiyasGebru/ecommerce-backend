import express from 'express';
import cors from 'cors';
import {connectToDB} from "./config/db.js";
import product_router from "./routers/ProductRouters.js";
import order_router from "./routers/OrderRouters.js";

const app = express();

app.use(express.json());

app.use("/api/products",cors(), product_router)
app.use("/api/orders",cors(), order_router)


connectToDB().then(()=>{

    app.listen(8080, ()=>{
        console.log("Server running on port 8080");
    });

})
