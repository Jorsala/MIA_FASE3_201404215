import { Router } from 'express';

const multipart = require('connect-multiparty'), multiPartMiddleware = multipart({
    uploadDir:'./uploads'
});

class FileRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{  
        this.router.post('/', multiPartMiddleware, function(req, res) {
            //console.log(req.body, req.files);
            var file = req.files.uploads;
            //console.log(file[0]);
            console.log(file[0].path);
            res.contentType('application/json').status(200).send(JSON.stringify(file[0].path));
           /*res.json({
               'message': 'fichero subido correctamente',
               'pathi': file[0].path    
           })*/
       }); //guarda imagen 
       
    }
}

const fileRoutes = new FileRoutes();
export default fileRoutes.router;