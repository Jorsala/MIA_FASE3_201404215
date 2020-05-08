import { Router } from 'express';
import chatController from '../controllers/chatController';


class ChatRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        this.router.get('/:id',chatController.search); // busca todos los chat de este helpdesk o usuario
        this.router.get('/user/:id',chatController.searchUser); // busca todos los chat de este usuario
        this.router.get('/search/:id',chatController.searchChat);   // buscar el chat 
        this.router.get('/mensajes/:id',chatController.searchMensajesChat); // busca los mensajes de esta conversacion
        this.router.get('/helpdesk/:id',chatController.searchHelpDesk);   // cuento el numero de chat que tiene el help desk
        this.router.post('/',chatController.createChat); //crea chat 
        this.router.post('/puntuacion',chatController.puntuacion); //puntacion help desk chat 
        this.router.post('/mensajes/',chatController.createMensajesChat); //mensajes con su id de  chat 
        this.router.delete('/:id',chatController.deletechat); //elimina chat
        this.router.delete('/mensajes/:id',chatController.deletemensaje); //elimina mensajes 
        this.router.put('/:id',chatController.updateEstado); //actualiza el estado del chat 
    } 
} 
   
const chatRoutes = new ChatRoutes();
export default chatRoutes.router; 