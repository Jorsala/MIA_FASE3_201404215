"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/users', usuarioController_1.default.listandousuarios); // todos usuario que esten en la tabla de usuario
        this.router.get('/:id', usuarioController_1.default.search); // busca usuario
        this.router.post('/search', usuarioController_1.default.searchUsuario); // un usuario  por correo
        this.router.post('/', usuarioController_1.default.create); //crea usuario
        this.router.delete('/:id', usuarioController_1.default.delete); //elimina usuario cambio de rol 
        this.router.put('/administrador/:id', usuarioController_1.default.update); //actualiza el administrador 
        this.router.put('/:id', usuarioController_1.default.updatecliente); //actualiza el usuario 
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
