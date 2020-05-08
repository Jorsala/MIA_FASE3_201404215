import {Request ,Response} from 'express';
//import db from '../database';
import oracle from 'oracledb';
import keys from './keys'
import { promises } from 'fs';
class ColorController {
    public async listandoColores (req: Request,res: Response){
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
      
            connection.execute("SELECT * FROM COLOR", {}, {
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
                            console.log("GET /api/productos: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }

    public async searchColorProductoIndividual(req: Request,res: Response): Promise<any>{
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
     
            connection.execute("SELECT * FROM COLOR WHERE PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
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
                            console.log("GET /api/color/search/" + req.params.id + " : Connection released");
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
            connection.execute("INSERT INTO COLOR(DESCRIPCION,PRODUCTO_ID_PRODUCTO)VALUES " +
                "(:DESCRIPCION,:PRODUCTO_ID_PRODUCTO) ", [req.body.DESCRIPCION,req.body.PRODUCTO_ID_PRODUCTO], {
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
                        res.status(201).set('Location', '/color/' + req.body.PRODUCTO_ID_PRODUCTO).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /color : Connection released");
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
    
            connection.execute("DELETE FROM COLOR WHERE ID_COLOR = :id", [req.params.id], {
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
                            console.log("DELETE /color/" + req.params.id + " : Connection released");
                        }
                    });
    
            });
        });
        //res.json({text:'delete'+ req.params.id});
    }

    public async update(req: Request,res: Response): Promise<void>{
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            const {id} =req.params.id;
            connection.execute("UPDATE COLOR set DESCRIPCION =:DESCRIPCION , PRODUCTO_ID_PRODUCTO =:PRODUCTO_ID_PRODUCTO  WHERE ID_COLOR = :id", [req.body.DESCRIPCION,req.body.PRODUCTO_ID_PRODUCTO,
                req.params.id], {
                autoCommit: true,  
                outFormat: oracle.OBJECT  
            }, function (err, result) { 
                if (err || result.rowsAffected === 0) {  
                    // Error 
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
                            console.log("PUT /color/" + req.params.id + " : Connection released");
                        }
                    });
    
            });
        });
        // res.json({text:'update'+ req.params.id});
    }
    
    
}

const colorController = new ColorController();
export default colorController;
