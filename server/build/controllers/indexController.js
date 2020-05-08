"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        //res.json({text: 'API is /api/productos'}); //verificar Seguir usando despues
        res.json({ text: 'La prueba se esta realizando exitosamente' });
        console.log('el server esta en el indexRoutes');
        //res.json({text: 'API is /api/usuario'});
    }
}
exports.indexController = new IndexController();
