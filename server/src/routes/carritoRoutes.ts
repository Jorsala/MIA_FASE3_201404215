import { Router } from 'express';
import carritoController from '../controllers/carritoController';
import productoController from '../controllers/productosController';

class CarritoRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.get('/:id',carritoController.search); // busca todos los productos del carrito de este usuario que le envie que haya logueado
        this.router.get('/search/:id',carritoController.searchCompra); // busca todos los productos de este usuario que le envie que haya logueado para mandar factura
        this.router.get('/search/carrito/:id',carritoController.searchCarrito); // busca el carrito del compra
        this.router.post('/',carritoController.createCarrito); // creo el carrito de compra
        this.router.post('/factura/',carritoController.createFactura); // creo la factura
        this.router.get('/factura/email/:id',carritoController.enviarEmailFactura); // obtengo el id de la factura
        this.router.post('/factura/emailenviar',carritoController.enviarFactura); // mandar la factura
        this.router.post('/detallecarrito/',carritoController.createDetalleCarrito); //crea producto en el carrito de compra 
        this.router.put('/detallecarrito/:id',carritoController.deleteDetalleCarrito); //elimina producto del carrito de compras // es eliminar pero puse put para que funcione
        this.router.put('/search/producto/:id',carritoController.searchcarritoproducto); // obtengo el producto dependiendo el carrito 
        this.router.put('/:id',carritoController.updateCarrito); //actualiza el la compra del carrito
        this.router.put('/carrito/:id',productoController.updateproducto); //actualiza el la compra del carrito
        //this.router.put('/carrito/cantidad/:id',productoController.updateproductocantidad); //actualiza el la compra del carrito
        this.router.put('/carrito/detallecarrito/:id',carritoController.updatedetallecarrito); //actualiza el EL DETALLAE CARRITO
        /*this.router.get('/:id',carritoController.search); // busca todos los productos de este usuario que le envie que haya logueado
        this.router.get('/search/:id',carrito Controller.searchProducto); // un producto */ 
    } 
} 
   
const carritoRoutes = new CarritoRoutes();
export default carritoRoutes.router; 