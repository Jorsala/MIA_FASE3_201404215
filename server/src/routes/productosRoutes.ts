import { Router } from 'express';
import productosController from '../controllers/productosController';
class ProductosRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.post('/',productosController.listandoproductos); // todos productos que esten en la tabla de productos no importando usuario
        this.router.put('/like/:id',productosController.listandoLIKENOMBRE); // todos con el productos dependiendo el patron LIKE
        this.router.post('/like',productosController.listandoLikeNombreCategoria); //obtener por like y patron 
        this.router.put('/categoria/:id',productosController.listandoCategoria); // todos con el productos dependiendo la categoria
        this.router.post('/crear',productosController.create); //crea producto 
        this.router.post('/crear/carga',productosController.createcarga); //crea producto carga masiva store procedure
        this.router.delete('/:id',productosController.delete); //elimina producto
        this.router.put('/:id',productosController.update); //actualiza el producto 
        this.router.put('/carrito/:id',productosController.updateproducto); //actualiza el producto cantidad
        this.router.put('/ordencategoria/:id',productosController.search); // busca todos los productos de este usuario que le envie que haya logueado  y su ordenamiento
        this.router.get('/search/:id',productosController.searchProducto); // un producto  
    } 
} 
   
const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;