import { Router } from "express";
import { productService } from "../dao/index.js";


const router = Router();


//routes
router.get("/",(req,res)=>{
    //indicar la vista
    res.render("home");
});

router.get("/realtimeproducts",async(req,res)=>{
    try {
        const {limit=10,page=1,stock,sort="asc"} = req.query;

        console.log(limit,page,stock,sort);
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        if(!["asc","desc"].includes(sort)){
            return res.render("products", {error:"Pedido no valido"})
        };
        const sortValue = sort === "asc" ? 1 : -1;
        let query = {};
        if(stockValue){
            query = {stock:{$gte:stockValue}}
        };
        const resultp = await productService.getWithPaginate(query,{
            page,
            limit,
            sort:{price:sortValue},
            lean: true
        });
        //console.log(resultp);

        //   http://localhost:8080
        const baseURL = '${req.protocol}://${req.get("host")}${req.originalUrl}'
        const ViewResultProducts = {}
           status:"success",
           payload: result.docs,
           totalPages: result.totalPages,
           prevPage: result.PrevPage,
           nextPage: result.nextPage,
           page: result.page,
           hasPrevPage: result.hasPrevPage,
           hasNextPage: result.hasNextPage,
           prevLink: result.hasPrevPage ? '${baseUrl.replace('page=${result.page}', 'page=${result.prevPage}')}' : null,
           nextLink: result.hasNextPage ? '${baseUrl.replace('page=${result.page}', 'page=${result.nextPage}')}' : null,
        }
        console.log(ViewResultProducts)
        res.render("products", ViewResultProducts);
    } catch (error) {
        res.render("realtimeproduct",{error:"No se pueden ver los datos"});
    }    
    
});


export {router as viewsRouter};