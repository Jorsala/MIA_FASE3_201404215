import {Request ,Response} from 'express';
import oracle from 'oracledb';
import keys from './keys'

class IndexController {
    index (req: Request,res: Response){
        //res.json({text: 'API is /api/productos'}); //verificar Seguir usando despues
        res.json({text: 'La prueba se esta realizando exitosamente'});
        console.log('el server esta en el indexRoutes');
        //res.json({text: 'API is /api/usuario'});
    } 

   
    
}  
  
export const indexController = new IndexController();