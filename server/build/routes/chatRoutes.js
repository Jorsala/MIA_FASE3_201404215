"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controllers/chatController"));
class ChatRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', chatController_1.default.search); // busca todos los chat de este helpdesk o usuario
        this.router.get('/user/:id', chatController_1.default.searchUser); // busca todos los chat de este usuario
        this.router.get('/search/:id', chatController_1.default.searchChat); // buscar el chat 
        this.router.get('/mensajes/:id', chatController_1.default.searchMensajesChat); // busca los mensajes de esta conversacion
        this.router.get('/helpdesk/:id', chatController_1.default.searchHelpDesk); // cuento el numero de chat que tiene el help desk
        this.router.post('/', chatController_1.default.createChat); //crea chat 
        this.router.post('/puntuacion', chatController_1.default.puntuacion); //puntacion help desk chat 
        this.router.post('/mensajes/', chatController_1.default.createMensajesChat); //mensajes con su id de  chat 
        this.router.delete('/:id', chatController_1.default.deletechat); //elimina chat
        this.router.delete('/mensajes/:id', chatController_1.default.deletemensaje); //elimina mensajes 
        this.router.put('/:id', chatController_1.default.updateEstado); //actualiza el estado del chat 
    }
}
const chatRoutes = new ChatRoutes();
exports.default = chatRoutes.router;
