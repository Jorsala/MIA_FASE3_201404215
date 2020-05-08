"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = __importDefault(require("../controllers/productosController"));
class ProductosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', productosController_1.default.listandoproductos); // todos productos que esten en la tabla de productos no importando usuario
        this.router.put('/like/:id', productosController_1.default.listandoLIKENOMBRE); // todos con el productos dependiendo el patron LIKE
        this.router.post('/like', productosController_1.default.listandoLikeNombreCategoria); //obtener por like y patron 
        this.router.put('/categoria/:id', productosController_1.default.listandoCategoria); // todos con el productos dependiendo la categoria
        this.router.post('/crear', productosController_1.default.create); //crea producto 
        this.router.post('/crear/carga', productosController_1.default.createcarga); //crea producto carga masiva store procedure
        this.router.delete('/:id', productosController_1.default.delete); //elimina producto
        this.router.put('/:id', productosController_1.default.update); //actualiza el producto 
        this.router.put('/carrito/:id', productosController_1.default.updateproducto); //actualiza el producto cantidad
        this.router.put('/ordencategoria/:id', productosController_1.default.search); // busca todos los productos de este usuario que le envie que haya logueado  y su ordenamiento
        this.router.get('/search/:id', productosController_1.default.searchProducto); // un producto  
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
