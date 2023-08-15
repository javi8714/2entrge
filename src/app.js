import express from "express";
import {config} from "./config/configdb.js";
import { connectDB } from "./config/dbConnection..js";

import {__dirname} from "./utils.js";
import { engine } from 'express-handlebars';
import path from "path";
import {Server} from "socket.io";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

const port = config.server.port;
//const port = 8080;
const app = express();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

const httpsServer = app.listen(port,()=>console.log(`Server esta funcionando en el puerto ${port}`));

//conectamos a la base de datos
connectDB();

//configuracion de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Crear servidor de websocket
const socketServer = new Server(httpsServer);
let messages = [];

// Crear el canal de comunicacion, detectar socket del cliente
socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado  ${socketConnected.id}`);
    // Capturar info del cliente
    socketConnected.on("messageKey", (data)=>{
        console.log(data);
        messages.push({userId:socketConnected.id,message:data});
    });

    

    socketConnected.on("nuevoProducto", (nuevoProd)=>{
        console.log(data);
       // messages.push({userId:socketConnected.id,message:data});

        // Enviar todos los mensajes a todos los clientes
        socketServer.emit("nuevoProducto", data);
    });
});


//acceso de routes
app.use("/api/products", productsRouter);
app.use("/api/carts" , cartsRouter );
app.use(viewsRouter);
