import { Router } from 'express';
import categoriaController from '../controllers/categoriaController';
import productoController from '../controllers/productosController';


class CategoriaRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.get('/',categoriaController.listandocategorias); // todas las categoria de productos
        this.router.post('/',categoriaController.create); //crea categoria 
        this.router.post('/carga',categoriaController.createcarga); //crea categoria
        this.router.delete('/:id',categoriaController.delete); //elimina categoria
        this.router.put('/:id',categoriaController.update); //actualiza la categoria 
        this.router.get('/:id',categoriaController.search); // busca todos los productos de esta categoria
        this.router.get('/search/:id',categoriaController.searchCategoria); // busca categoria su informacion
        this.router.post('/search/nombre',categoriaController.searchnombre); //crea categoria
    } 
} 
   
const categoriaRoutes = new CategoriaRoutes();
export default categoriaRoutes.router; 