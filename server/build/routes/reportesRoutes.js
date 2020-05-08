"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportesController_1 = __importDefault(require("../controllers/reportesController"));
class ReportesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // REPORTE LISTADO DE HELP DESK Y EL PROMEDIO DE SU PUNTUACION ORDENADA DE MAYOR A MENOR
        this.router.get('/', reportesController_1.default.listHelpDeskProm);
        //LISTADO DE TODOS LOS HELP DESK DE SEXO MASCULINO QUE HAYAN NACIDO ARRIBA DE X YEAR
        this.router.get('/:id', reportesController_1.default.listhelpdeskyear);
        //LISTADO DE TODOS LOS ADMINISTRADORES DE SEXO FEMENINO QUE HAYAN NACIDO DEBAJO DE Y YEAR
        this.router.get('/admin/:id', reportesController_1.default.listadminyear);
        //CLIENTES CON MAYOR GANANCIA HAN GENERADO ORDENADOS DE MAYOR A MENOR
        this.router.get('/clientes/:id', reportesController_1.default.listclientgananciadesc);
        //TODOS LOS PRODUCTOS CON EL PROMEDIO DE SU PUNTUACION PARA 5,4,3,2,1,0 ESTRELLAS  
        this.router.get('/productos/:id', reportesController_1.default.listapromproduct);
        //TOP 3 DE PRODUCTOS MAS VENDIDOS 
        this.router.get('/productos/top/:id', reportesController_1.default.listtopproduct);
        //TOP 3 DE CLIENTES QUE MAS PRODUCTOS TENGAN EN SU CATALOGO 
        this.router.get('/productos/topclient/:id', reportesController_1.default.listtopclientproduct);
        //LISTADO DE TODOS LOS PRODUCTOS INDICANDO EN QUE CATEGORIA SE ENCONTRABAN, SI EN DADO CASO TIENE CATEGORIAS HIJAS DEBE MOSTRARLAS
        this.router.get('/productos/categoriap/:id', reportesController_1.default.listcategoripadreproduct); // obtengo los productos y sus categoria respectivas
        this.router.get('/productos/categoriah/:id', reportesController_1.default.listcategorihproduct); // cagegorias hijas del producto
        //TODOS LOS PRODUCTOS INDICANDO LA CANTIDAD DE COMENTARIOS ASIGNADOS, PUBLICADOS EN Y FECHA
        this.router.put('/productos/nocomentarios', reportesController_1.default.listcomentarioproduc);
        //TODOS LOS PRODUCTOS QUE TENGAN X CANTIDAD DISPONIBLE
        this.router.get('/productos/cantidaddisponible/:id', reportesController_1.default.listcantidadproduct);
        //TOP 2 DE PRODUCTOS CON PEOR PUNTUACION
        this.router.get('/productos/puntuacion/:id', reportesController_1.default.listpuntuacionproduct);
    }
}
const reportesRoutes = new ReportesRoutes();
exports.default = reportesRoutes.router;
