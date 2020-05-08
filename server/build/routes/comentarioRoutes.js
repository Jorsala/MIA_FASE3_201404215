"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentarioController_1 = __importDefault(require("../controllers/comentarioController"));
class ComentarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', comentarioController_1.default.listandoComentarios); // todos comentarios de los productos
        this.router.get('/producto/:id', comentarioController_1.default.listandoComentariosproducto); // todos comentarios de los productos
        this.router.get('/star5/:id', comentarioController_1.default.listandoComentariosStar5); // todos comentarios deL PRODUCTO PONDERACION 5
        this.router.get('/star4/:id', comentarioController_1.default.listandoComentariosStar4); // todos comentarios del producto PONDERACION 4
        this.router.get('/star3/:id', comentarioController_1.default.listandoComentariosStar3); // todos comentarios del producto PONDERACION 3
        this.router.get('/star2/:id', comentarioController_1.default.listandoComentariosStar2); // todos comentarios del producto PONDERACION 2
        this.router.get('/star1/:id', comentarioController_1.default.listandoComentariosStar1); // todos comentarios del producto PONDERACION 1
        this.router.get('/respuestas/:id', comentarioController_1.default.listandoComentariosRespuesta); // todas las respuestas del  producto
        this.router.post('/', comentarioController_1.default.create); //crea comentario 
        this.router.delete('/:id', comentarioController_1.default.delete); //elimina comentario
        this.router.get('/:id', comentarioController_1.default.searchComentarioIndividual); // busca todos los comentario de este producto
    }
}
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
