"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = __importDefault(require("../controllers/carritoController"));
const productosController_1 = __importDefault(require("../controllers/productosController"));
class CarritoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', carritoController_1.default.search); // busca todos los productos del carrito de este usuario que le envie que haya logueado
        this.router.get('/search/:id', carritoController_1.default.searchCompra); // busca todos los productos de este usuario que le envie que haya logueado para mandar factura
        this.router.get('/search/carrito/:id', carritoController_1.default.searchCarrito); // busca el carrito del compra
        this.router.post('/', carritoController_1.default.createCarrito); // creo el carrito de compra
        this.router.post('/factura/', carritoController_1.default.createFactura); // creo la factura
        this.router.get('/factura/email/:id', carritoController_1.default.enviarEmailFactura); // obtengo el id de la factura
        this.router.post('/factura/emailenviar', carritoController_1.default.enviarFactura); // mandar la factura
        this.router.post('/detallecarrito/', carritoController_1.default.createDetalleCarrito); //crea producto en el carrito de compra 
        this.router.put('/detallecarrito/:id', carritoController_1.default.deleteDetalleCarrito); //elimina producto del carrito de compras // es eliminar pero puse put para que funcione
        this.router.put('/search/producto/:id', carritoController_1.default.searchcarritoproducto); // obtengo el producto dependiendo el carrito 
        this.router.put('/:id', carritoController_1.default.updateCarrito); //actualiza el la compra del carrito
        this.router.put('/carrito/:id', productosController_1.default.updateproducto); //actualiza el la compra del carrito
        //this.router.put('/carrito/cantidad/:id',productoController.updateproductocantidad); //actualiza el la compra del carrito
        this.router.put('/carrito/detallecarrito/:id', carritoController_1.default.updatedetallecarrito); //actualiza el EL DETALLAE CARRITO
        /*this.router.get('/:id',carritoController.search); // busca todos los productos de este usuario que le envie que haya logueado
        this.router.get('/search/:id',carrito Controller.searchProducto); // un producto */
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
