import { Router } from 'express';
import reportesController from '../controllers/reportesController';


class ReportesRoutes{

    public router: Router = Router();

    constructor(){
        this.config(); 
    }

    config():void{
        // REPORTE LISTADO DE HELP DESK Y EL PROMEDIO DE SU PUNTUACION ORDENADA DE MAYOR A MENOR
        this.router.get('/',reportesController.listHelpDeskProm);
        //LISTADO DE TODOS LOS HELP DESK DE SEXO MASCULINO QUE HAYAN NACIDO ARRIBA DE X YEAR
        this.router.get('/:id',reportesController.listhelpdeskyear);
        //LISTADO DE TODOS LOS ADMINISTRADORES DE SEXO FEMENINO QUE HAYAN NACIDO DEBAJO DE Y YEAR
        this.router.get('/admin/:id',reportesController.listadminyear);
        //CLIENTES CON MAYOR GANANCIA HAN GENERADO ORDENADOS DE MAYOR A MENOR
        this.router.get('/clientes/:id',reportesController.listclientgananciadesc);
        //TODOS LOS PRODUCTOS CON EL PROMEDIO DE SU PUNTUACION PARA 5,4,3,2,1,0 ESTRELLAS  
        this.router.get('/productos/:id',reportesController.listapromproduct);
        //TOP 3 DE PRODUCTOS MAS VENDIDOS 
        this.router.get('/productos/top/:id',reportesController.listtopproduct);
        //TOP 3 DE CLIENTES QUE MAS PRODUCTOS TENGAN EN SU CATALOGO 
        this.router.get('/productos/topclient/:id',reportesController.listtopclientproduct);
        //LISTADO DE TODOS LOS PRODUCTOS INDICANDO EN QUE CATEGORIA SE ENCONTRABAN, SI EN DADO CASO TIENE CATEGORIAS HIJAS DEBE MOSTRARLAS
        this.router.get('/productos/categoriap/:id',reportesController.listcategoripadreproduct); // obtengo los productos y sus categoria respectivas
        this.router.get('/productos/categoriah/:id',reportesController.listcategorihproduct); // cagegorias hijas del producto
        //TODOS LOS PRODUCTOS INDICANDO LA CANTIDAD DE COMENTARIOS ASIGNADOS, PUBLICADOS EN Y FECHA
        this.router.put('/productos/nocomentarios',reportesController.listcomentarioproduc); 
        //TODOS LOS PRODUCTOS QUE TENGAN X CANTIDAD DISPONIBLE
        this.router.get('/productos/cantidaddisponible/:id',reportesController.listcantidadproduct);
        //TOP 2 DE PRODUCTOS CON PEOR PUNTUACION
        this.router.get('/productos/puntuacion/:id',reportesController.listpuntuacionproduct);
    } 
} 
   
const reportesRoutes = new ReportesRoutes();
export default reportesRoutes.router; 