import { Router } from 'express';
import colorController from '../controllers/colorController';
import productoController from '../controllers/productosController';


class ColorRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.get('/',colorController.listandoColores); // todos colores de los productos
        this.router.post('/',colorController.create); //crea color 
        this.router.delete('/:id',colorController.delete); //elimina color
        this.router.put('/:id',colorController.update); //actualiza el color 
        this.router.get('/:id',colorController.searchColorProductoIndividual); // busca todos los colores de este producto

    } 
} 
   
const colorRoutes = new ColorRoutes();
export default colorRoutes.router; 