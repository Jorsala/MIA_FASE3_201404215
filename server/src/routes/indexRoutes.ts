import { Router } from 'express';

import  {indexController} from '../controllers/indexController';
import usuarioController from '../controllers/usuarioController';

class IndexRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/prueba',indexController.index);
        //this.router.get('/',indexController.index1);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;