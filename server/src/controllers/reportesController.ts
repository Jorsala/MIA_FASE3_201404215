import {Request ,Response} from 'express';
//import db from '../database';
import oracle from 'oracledb';
import keys from './keys'
import { promises } from 'fs';
class ReportesController {
    public async listHelpDeskProm(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT DISTINCT AVG(P.PUNTUACION) AS PROM , P.USUARIO_ID_USUARIO AS IDUSUARIO FROM PUNTUACION P'+
            ' INNER JOIN USUARIO U'+
            ' ON U.ROL_ID_ROL = 2 AND P.USUARIO_ID_USUARIO = U.ID_USUARIO'+
            ' GROUP BY P.USUARIO_ID_USUARIO'+
            ' ORDER BY P.USUARIO_ID_USUARIO DESC';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listhelpdeskyear(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let genero:string = "'"+'Masculino'+"'"
            let consulta:string = 'SELECT * FROM USUARIO WHERE ROL_ID_ROL = 2 AND EXTRACT(YEAR FROM FECHA_NACIMIENTO) >'+req.params.id+' AND GENERO = '+genero+'';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/"+ req.params.id +" Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }

    public async listadminyear(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let genero:string = "'"+'Femenino'+"'"
            let consulta:string = 'SELECT * FROM USUARIO WHERE ROL_ID_ROL = 1 AND EXTRACT(YEAR FROM FECHA_NACIMIENTO) <'+req.params.id+' AND GENERO = '+genero+'';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/admin/"+ req.params.id +" Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listclientgananciadesc(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT * FROM USUARIO WHERE ROL_ID_ROL = 3 ORDER BY GANANCIA_OBTENIDA DESC';
            console.log(consulta)
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/clientes Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listapromproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT DISTINCT AVG(PONDERACION) AS PROM_DE_PONDERACION,PRODUCTO_ID_PRODUCTO AS IDPRODUCTO  FROM COMENTARIO GROUP BY PRODUCTO_ID_PRODUCTO';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/ Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listtopproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT DC.PRODUCTO_ID_PRODUCTO AS IDP, COUNT(*) AS CANT  FROM DETALLE_CARRITO DC '+
            ' INNER JOIN FACTURA F'+
            ' ON F.CARRITO_ID_CARRITO = DC.CARRITO_ID_CARRITO'+
            ' GROUP BY PRODUCTO_ID_PRODUCTO'+
            ' ORDER BY COUNT(*) DESC'+
            ' FETCH FIRST 3 ROWS ONLY';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/top Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listtopclientproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = '   SELECT U.ID_USUARIO,U.NOMBRE AS NOMB,COUNT(*) AS CANT  FROM USUARIO U'+
           ' INNER JOIN PRODUCTO P ON U.ID_USUARIO =  P.USUARIO_ID_USUARIO' +  
           ' WHERE ROL_ID_ROL = 3'+
           ' GROUP BY U.ID_USUARIO,U.NOMBRE'+
           ' ORDER BY COUNT(*) DESC'+
           ' FETCH FIRST 3 ROWS ONLY';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/top Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listcategoripadreproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT * FROM CATEGORIA';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/categoriapadre Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }

    public async listcategorihproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT * FROM CATEGORIA WHERE CATEGORIA_ID_CATEGORIA = '+ req.params.id;
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/categoriahijas Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listcomentarioproduc(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let fech = new Date(req.body.FECHA)
            let dd = fech.getDate();
            let mm = fech.getMonth()+1;
            let yy = fech.getFullYear();

            let fecha =  dd+'/'+mm+'/'+yy;
            console.log(fecha);
            console.log(req.body.FECHA);

            let consulta:string = 'SELECT PRODUCTO_ID_PRODUCTO, COUNT(*) AS CANT FROM COMENTARIO WHERE FECHA = '+ 'TO_DATE('+"'"+req.body.FECHA+"'"+','+"'"+'DD/MM/YY'+"'"+')'+
            ' AND COMENTARIO_ID_COMENTARIO IS NULL'+
            ' GROUP BY PRODUCTO_ID_PRODUCTO'+
            ' ORDER BY COUNT(*) DESC';
                        //"2019-04-21T06:00:00.000Z"               

            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/comentarios Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listcantidadproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = 'SELECT * FROM PRODUCTO WHERE CANTIDAD_DISPONIBLE ='+ req.params.id;
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/categoriahijas Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listpuntuacionproduct(req: Request,res: Response){
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let consulta:string = ' SELECT PRODUCTO_ID_PRODUCTO AS IDPROD, AVG(PONDERACION) AS PUNT FROM COMENTARIO '+
            'GROUP BY PRODUCTO_ID_PRODUCTO '+
            'ORDER BY AVG(PONDERACION) ASC '+
            'FETCH FIRST 3 ROWS ONLY';
            connection.execute(consulta, {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) { 
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/reportes/productos/categoriahijas Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    
}

const reportesController = new ReportesController();
export default reportesController;
