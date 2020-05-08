"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colorController_1 = __importDefault(require("../controllers/colorController"));
class ColorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', colorController_1.default.listandoColores); // todos colores de los productos
        this.router.post('/', colorController_1.default.create); //crea color 
        this.router.delete('/:id', colorController_1.default.delete); //elimina color
        this.router.put('/:id', colorController_1.default.update); //actualiza el color 
        this.router.get('/:id', colorController_1.default.searchColorProductoIndividual); // busca todos los colores de este producto
    }
}
const colorRoutes = new ColorRoutes();
exports.default = colorRoutes.router;
