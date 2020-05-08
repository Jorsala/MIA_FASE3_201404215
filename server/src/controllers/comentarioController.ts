import {Request ,Response} from 'express';
//import db from '../database';
import oracle from 'oracledb';
import keys from './keys'
import { promises } from 'fs';
 
class ComentarioController {

    public async listandoComentarios (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE COMENTARIO_ID_COMENTARIO IS NULL", {}, {
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
                            console.log("GET /api/comentario: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosproducto (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE COMENTARIO_ID_COMENTARIO IS NULL AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosStar5 (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 5 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario/star5/: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosStar4 (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 4 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario/star4/: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosStar3 (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 3 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario/star3/: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosStar2 (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 2 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario/star2/: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosStar1 (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 1  AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario/star1/: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }
    public async listandoComentariosRespuesta (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COMENTARIO  WHERE COMENTARIO_ID_COMENTARIO IS NOT NULL AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id],{
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
                            console.log("GET /api/comentario: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }

    public async searchComentarioIndividual(req: Request,res: Response): Promise<any>{
        const {id} = req.params;
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
     
            connection.execute("SELECT * FROM COMENTARIO WHERE USUARIO_ID_USUARIO = :id", [req.params.id], {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) { 
                if (err /*|| (result.rows.length < 1)*/) { 
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the user profile" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                } 
                // Release the connection
                connection.release(
                    function (err) {  
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/comentario/search/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
   } 

    public create (req: Request,res: Response){
        oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now= new Date()
            connection.execute("INSERT INTO COMENTARIO(TITULO,FECHA,PONDERACION,DESCRIPCION,NOMBREUSUARIO,USUARIO_ID_USUARIO,COMENTARIO_ID_COMENTARIO,PRODUCTO_ID_PRODUCTO)VALUES " +
                "(:TITULO,:FECHA,:PONDERACION,:DESCRIPCION,:NOMBREUSUARIO,:USUARIO_ID_USUARIO,:COMENTARIO_ID_COMENTARIO,:PRODUCTO_ID_PRODUCTO) ", [req.body.TITULO,now,req.body.PONDERACION,
                    req.body.DESCRIPCION,req.body.NOMBREUSUARIO,req.body.USUARIO_ID_USUARIO,req.body.COMENTARIO_ID_COMENTARIO,req.body.PRODUCTO_ID_PRODUCTO], {
                    autoCommit: true,
                    outFormat: oracle.OBJECT // Return the result as Object  
                },
                function (err, result) {
                    if (err) {  
                        // Error
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        })); 
                    } else {
                        // Successfully created the resource
                        res.status(201).set('Location', '/comentario/' + req.body.PRODUCTO_ID_PRODUCTO).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /comentario : Connection released");
                            }
                        });
                });
        })


        //console.log(req.body)
        //res.json({text:'post'});  
    }
     
    public async delete(req: Request,res: Response){
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
    
            connection.execute("DELETE FROM COLOR WHERE ID_COMENTARIO = :id", [req.params.id], {
                autoCommit: true,
                outFormat: oracle.OBJECT
            }, function (err, result) {
                if (err || result.rowsAffected === 0) {
                    // Error  
                    console.log(req.body) 
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err ? "Input Error" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    // Resource successfully deleted. Sending an empty response body. 
                    res.status(204).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("DELETE /comentario/" + req.params.id + " : Connection released");
                        }
                    });
    
            });
        });
        //res.json({text:'delete'+ req.params.id});
    }    
}

const comentarioController = new ComentarioController();
export default comentarioController;
