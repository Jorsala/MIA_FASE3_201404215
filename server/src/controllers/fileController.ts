import {Request ,Response} from 'express';
import fs from 'fs';

class FileController {
    public async cargarImagen(req: Request,res: Response){
        const {
            pathFile
        } = req.body;

        fs.readFile(pathFile, 'base64',  (err,data)=>{
            if (err) {
                console.log('ocurrio un error');
            } else {
                res.status(200).json('data:image/png;base64,'+ data.toString());
            }
        });

    }
    
}  
  
export const fileController = new FileController();