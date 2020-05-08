import { Router } from 'express';
import comentarioController from '../controllers/comentarioController';
import productoController from '../controllers/productosController';


class ComentarioRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.get('/',comentarioController.listandoComentarios); // todos comentarios de los productos
        this.router.get('/producto/:id',comentarioController.listandoComentariosproducto); // todos comentarios de los productos
        this.router.get('/star5/:id',comentarioController.listandoComentariosStar5); // todos comentarios deL PRODUCTO PONDERACION 5
        this.router.get('/star4/:id',comentarioController.listandoComentariosStar4); // todos comentarios del producto PONDERACION 4
        this.router.get('/star3/:id',comentarioController.listandoComentariosStar3); // todos comentarios del producto PONDERACION 3
        this.router.get('/star2/:id',comentarioController.listandoComentariosStar2); // todos comentarios del producto PONDERACION 2
        this.router.get('/star1/:id',comentarioController.listandoComentariosStar1); // todos comentarios del producto PONDERACION 1
        this.router.get('/respuestas/:id',comentarioController.listandoComentariosRespuesta); // todas las respuestas del  producto
        this.router.post('/',comentarioController.create); //crea comentario 
        this.router.delete('/:id',comentarioController.delete); //elimina comentario
        this.router.get('/:id',comentarioController.searchComentarioIndividual); // busca todos los comentario de este producto
 
    } 
} 
   
const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;  