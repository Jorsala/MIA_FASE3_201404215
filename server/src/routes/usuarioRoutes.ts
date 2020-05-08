import { Router } from 'express';
import usuarioController from '../controllers/usuarioController';
import oracle from 'oracledb';


class UsuarioRoutes{

   
    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.get('/users',usuarioController.listandousuarios); // todos usuario que esten en la tabla de usuario
        this.router.get('/:id',usuarioController.search); // busca usuario
        this.router.post('/search',usuarioController.searchUsuario); // un usuario  por correo
        this.router.post('/',usuarioController.create); //crea usuario
        this.router.delete('/:id',usuarioController.delete); //elimina usuario cambio de rol 
        this.router.put('/administrador/:id',usuarioController.update); //actualiza el administrador 
        this.router.put('/:id',usuarioController.updatecliente); //actualiza el usuario 
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;