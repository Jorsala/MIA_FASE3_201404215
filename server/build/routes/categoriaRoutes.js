"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = __importDefault(require("../controllers/categoriaController"));
class CategoriaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoriaController_1.default.listandocategorias); // todas las categoria de productos
        this.router.post('/', categoriaController_1.default.create); //crea categoria 
        this.router.post('/carga', categoriaController_1.default.createcarga); //crea categoria
        this.router.delete('/:id', categoriaController_1.default.delete); //elimina categoria
        this.router.put('/:id', categoriaController_1.default.update); //actualiza la categoria 
        this.router.get('/:id', categoriaController_1.default.search); // busca todos los productos de esta categoria
        this.router.get('/search/:id', categoriaController_1.default.searchCategoria); // busca categoria su informacion
        this.router.post('/search/nombre', categoriaController_1.default.searchnombre); //crea categoria
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;
