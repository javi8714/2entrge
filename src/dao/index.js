import { config } from "../config/configdb.js";
import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
import { ProductManagerMongo } from "./mongo/productManagerMongo.js"
import { CartManagerMongo } from "./mongo/cartManagerMongo.js";
import { connectDB } from "../config/dbConnection.js";




connectDB();
const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();


export {productService, cartService}

